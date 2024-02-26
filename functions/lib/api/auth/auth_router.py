import os

from fastapi import APIRouter, Depends, Body
from fastapi.security import HTTPBasicCredentials, HTTPAuthorizationCredentials
from firebase_admin import auth
from fastapi import HTTPException
from lib.api.auth.auth_model import FirebaseUser, SavedApiKey, ApiKey
from lib.api.auth.auth_scheme import username_password_scheme, access_token_scheme, api_key_scheme
from lib.utils.auth_utils import authenticated_access_token, admin_scope, user_scope, authenticated_api_key, \
    authenticated, invalid_credentials_exception
from lib.utils.firebase.client import client_auth
from lib.utils.firebase.admin import db
from uuid import uuid4

from lib.utils.now import now

router = APIRouter(
    tags=["Auth"],
)


# Create keys

# @router.post("/auth/access-token")
# def create_access_token(cred: HTTPBasicCredentials = Depends(username_password_scheme)) -> str:
#     print("Credentials: {0}".format(cred))
#     try:
#         authorization = client_auth.sign_in_with_email_and_password(email=cred.username, password=cred.password)
#         token = authorization["idToken"]
#         return token
#     except Exception as e:
#         print("Error creating token: {0}".format(e))
#         raise invalid_credentials_exception


@router.post("/auth/api-key", include_in_schema=False)
def create_api_key(details: ApiKey, user: FirebaseUser = Depends(authenticated_access_token)) -> SavedApiKey:
    try:
        key = str(uuid4())
        key_name = details.name.strip()
        api_key_doc = db().collection(f"v1/public/users/{user.uid}/api-keys").document()
        api_key_doc.set({"name": key_name, "key": key, "created_at": now()})
        return SavedApiKey(id=api_key_doc.id, key=key, name=key_name, created_at=now())
    except Exception as e:
        print("Error creating token: {0}".format(e))
        raise HTTPException(status_code=401, detail="Invalid credentials")


# USER AUTH

@router.get("/auth")
def get_authenticated_user(user=Depends(authenticated)) -> FirebaseUser:
    return user


# SCOPES

@router.get("/auth/scopes", include_in_schema=False)
def get_scopes(user=Depends(user_scope)) -> list[str]:
    return list(dict(user.custom_claims).keys())


@router.put("/auth/scopes", include_in_schema=False)
def grant_scopes(scopes: list[str] = Body(example=["user"]), user=Depends(admin_scope)) -> list[str]:
    claims: dict = user.custom_claims
    for scope in scopes:
        claims[scope] = True
    auth.update_user(user.uid, custom_claims=claims)
    return list(claims.keys())


@router.delete("/auth/scopes", include_in_schema=False)
def delete_scopes(scopes: list[str] = Body(example=["user"]), user=Depends(admin_scope)) -> list[str]:
    claims: dict = user.custom_claims
    for scope in scopes:
        claims.pop(scope)
    auth.update_user(user.uid, custom_claims=claims)
    return list(claims.keys())
