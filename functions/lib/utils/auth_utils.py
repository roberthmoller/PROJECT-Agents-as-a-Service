from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from firebase_admin import auth
from firebase_admin.auth import UserRecord

from lib.api.auth.auth_model import FirebaseUser
from lib.api.auth.auth_scheme import access_token_scheme, api_key_scheme
from lib.utils.firebase.admin import db

invalid_credentials_exception = HTTPException(status_code=401, detail="Invalid credentials")


def authenticated_access_token(bearer: HTTPAuthorizationCredentials = Depends(access_token_scheme)) -> FirebaseUser:
    token = bearer.credentials
    try:
        authorization = auth.verify_id_token(token)
    except Exception as e:
        print("Error verifying token: {0}".format(e))
        raise HTTPException(status_code=401, detail="Invalid token")

    return user_from_uid(authorization["uid"])


def authenticated_api_key(bearer: HTTPAuthorizationCredentials = Depends(api_key_scheme)) -> FirebaseUser:
    api_key = bearer.credentials
    unauthenticated = HTTPException(status_code=401, detail="Invalid token")
    try:
        api_keys_data = db().collection_group(f"api-keys").where("key", "==", api_key).get()
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


def user_scope(user: FirebaseUser = Depends(authenticated_access_token)) -> FirebaseUser:
    return user


def admin_scope(user: FirebaseUser = Depends(authenticated_access_token)) -> FirebaseUser:
    if user.custom_claims.get("admin"):
        return user
    else:
        print("User is not an admin")
        raise HTTPException(status_code=403, detail="Unauthorized")
