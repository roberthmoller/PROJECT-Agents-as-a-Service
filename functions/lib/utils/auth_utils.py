from base64 import b64encode
from hashlib import sha256
from uuid import uuid4

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from firebase_admin import auth
from firebase_admin.auth import UserRecord
from firebase_admin.firestore import firestore as Firestore

from lib.api.auth.auth_model import FirebaseUser, SecretApiKey, ApiKey
from lib.api.auth.auth_scheme import access_token_scheme, api_key_scheme
from lib.utils.firebase.admin import db
from lib.utils.env import env
from lib.utils.now import now

invalid_credentials_exception = HTTPException(status_code=401, detail="Invalid credentials")


def generate_api_key(user: FirebaseUser, details: ApiKey, key_id: str) -> SecretApiKey:
    key_name = details.name.strip()
    secret_key = hash_secret_api_key(key_name, user.uid)
    public_key = hash_public_api_key(secret_key)
    return SecretApiKey(
        id=key_id,
        name=key_name,
        public_key=public_key,
        secret_key=secret_key,
        secret_suffix=secret_key[-4:],
        created_at=now(),
    )


def hash_secret_api_key(key_name: str, uid: str):
    key_gen = sha256()
    key_gen.update(uuid4().bytes)
    key_gen.update(uid.encode())
    key_gen.update(key_name.encode())
    key_gen.update(env.api_key_pepper.encode())
    secret_key = b64encode(key_gen.digest()).decode()
    return f'sk-{secret_key.strip()}'


def authenticated_access_token(bearer: HTTPAuthorizationCredentials = Depends(access_token_scheme)) -> FirebaseUser:
    token = bearer.credentials
    try:
        authorization = auth.verify_id_token(token)
    except Exception as e:
        print("Error verifying token: {0}".format(e))
        raise HTTPException(status_code=401, detail="Invalid token")

    return user_from_uid(authorization["uid"])


def authenticated_api_key(bearer: HTTPAuthorizationCredentials = Depends(api_key_scheme)) -> FirebaseUser:
    secret_key = bearer.credentials
    unauthenticated = HTTPException(status_code=401, detail="Invalid token")
    try:
        print("Secret key: {0}".format(secret_key))
        public_key = hash_public_api_key(secret_key.strip())
        print("Public key: {0}".format(public_key))
        api_keys_data = (db().collection_group(f"api-keys")
                         .where(filter=Firestore.FieldFilter("public_key", "==", public_key))
                         .get())
        if (api_keys_data is None) or (len(api_keys_data) == 0):
            raise unauthenticated

        api_keys_refs = list(map(lambda agent: agent.reference, api_keys_data))
        api_key_parents = list(map(lambda agent: agent.parent.parent, api_keys_refs))

        if (api_key_parents is None) or (len(api_key_parents) == 0):
            raise unauthenticated

        uid = list(map(lambda agent: agent.id, api_key_parents))[0]
    except Exception as e:
        print("Error verifying token: {0}".format(e))
        raise HTTPException(status_code=401, detail="Invalid token")

    return user_from_uid(uid)


def hash_public_api_key(secret_api_key: str):
    key_digest = sha256()
    key_digest.update(secret_api_key.strip().encode())
    hashed_key = b64encode(key_digest.digest()).decode()
    return f'pk-{hashed_key.strip()}'


def authenticated(
        access_token_bearer: HTTPAuthorizationCredentials = Depends(access_token_scheme),
        api_token_bearer: HTTPAuthorizationCredentials = Depends(api_key_scheme)
) -> FirebaseUser:
    if not (access_token_bearer or api_token_bearer):
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if access_token_bearer:
        return authenticated_access_token(access_token_bearer)
    else:
        return authenticated_api_key(api_token_bearer)


def user_from_uid(uid: str) -> FirebaseUser:
    try:
        user: UserRecord = auth.get_user(uid)
        return FirebaseUser.of(user)
    except Exception as e:
        print("Error getting user: {0}".format(e))
        raise HTTPException(status_code=404, detail="User not found")


def scope(required_scope: str):
    def require_scope(user: FirebaseUser = Depends(authenticated_access_token)):
        if user.custom_claims.get(required_scope):
            return user
        else:
            print(f"User does not have required scope {required_scope}")
            raise HTTPException(status_code=403, detail="Forbidden")

    return require_scope


def user_scope(user: FirebaseUser = Depends(authenticated)) -> FirebaseUser:
    return user


def admin_scope(user: FirebaseUser = Depends(authenticated)) -> FirebaseUser:
    if user.custom_claims.get("admin"):
        return user
    else:
        print("User is not an admin")
        raise HTTPException(status_code=403, detail="Unauthorized")
