import os

from fastapi import APIRouter, Depends, Body
from fastapi.security import HTTPBasicCredentials
from firebase_admin import auth
from fastapi import HTTPException
from lib.api.auth.auth_model import FirebaseUser
from lib.api.auth.auth_scheme import basic_scheme
from lib.utils.auth_utils import authenticated, admin_scope, user_scope
from lib.utils.firebase.client import client_auth

os.environ["FIREBASE_AUTH_EMULATOR_HOST"] = ""
# os.environ["FIREBASE_AUTH_EMULATOR_HOST"] = "127.0.0.1:9099"

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


@router.post("/")
def create_access_token(cred: HTTPBasicCredentials = Depends(basic_scheme)) -> str:
    print("Credentials: {0}".format(cred))
    try:
        authorization = client_auth.sign_in_with_email_and_password(email=cred.username, password=cred.password)
        print("Authorization: {0}".format(authorization))
        token = authorization["idToken"]
        print("Token: {0}".format(token))
        return token
    except Exception as e:
        print("Error creating token: {0}".format(e))
        raise HTTPException(status_code=401, detail="Invalid credentials")


@router.get("/")
def get_authenticated_user(user=Depends(authenticated)) -> FirebaseUser:
    return user


@router.get("/scopes")
def get_scopes(user=Depends(user_scope)) -> list[str]:
    return list(dict(user.custom_claims).keys())


@router.put("/scopes")
def grant_scopes(scopes: list[str] = Body(example=["user"]), user=Depends(admin_scope)) -> list[str]:
    claims: dict = user.custom_claims
    for scope in scopes:
        claims[scope] = True
    auth.update_user(user.uid, custom_claims=claims)
    return list(claims.keys())


@router.delete("/scopes")
def delete_scopes(scopes: list[str] = Body(example=["user"]), user=Depends(admin_scope)) -> list[str]:
    claims: dict = user.custom_claims
    for scope in scopes:
        claims.pop(scope)
    auth.update_user(user.uid, custom_claims=claims)
    return list(claims.keys())
