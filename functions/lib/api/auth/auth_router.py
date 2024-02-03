import os

from fastapi import APIRouter, Depends
from fastapi.security import HTTPBasicCredentials

from lib.api.auth.auth_scheme import basic_scheme
from lib.utils.auth_utils import authenticated
from lib.utils.firebase.client import client_auth
from firebase_admin import auth

os.environ["FIREBASE_AUTH_EMULATOR_HOST"] = ""
# os.environ["FIREBASE_AUTH_EMULATOR_HOST"] = "127.0.0.1:9099"

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


@router.post("/")
def create_access_token(cred: HTTPBasicCredentials = Depends(basic_scheme)):
    print("Credentials: {0}".format(cred))
    try:
        authorization = client_auth.sign_in_with_email_and_password(email=cred.username, password=cred.password)
        print("Authorization: {0}".format(authorization))
        token = authorization["idToken"]
        print("Token: {0}".format(token))
        return token
    except Exception as e:
        print("Error creating token: {0}".format(e))
        return e


@router.get("/")
def get_authenticated_user(user=Depends(authenticated)):
    return user


@router.get("/scopes")
def grant_scopes(user=Depends(authenticated)) -> list[str]:
    return list(dict(user.custom_claims).keys())


@router.put("/scopes")
def grant_scopes(scopes: list[str], user=Depends(authenticated)) -> list[str]:
    claims: dict = user.custom_claims
    for scope in scopes:
        claims[scope] = True
    auth.update_user(user.uid, custom_claims=claims, )
    return list(claims.keys())


@router.delete("/scopes")
def delete_scopes(scopes: list[str], user=Depends(authenticated)):
    claims: dict = user.custom_claims
    for scope in scopes:
        claims.pop(scope)
    auth.update_user(user.uid, custom_claims=claims)
    return list(claims.keys())
