from fastapi import APIRouter, Depends, Body
from fastapi import HTTPException
from firebase_admin import auth

from lib.api.auth.auth_model import FirebaseUser, SavedApiKey, ApiKey, SecretApiKey
from lib.utils.auth_utils import authenticated_access_token, admin_scope, user_scope, authenticated, generate_api_key
from lib.utils.firebase.admin import db

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


@router.post("/auth/api-key")
def create_api_key(details: ApiKey, user: FirebaseUser = Depends(authenticated_access_token)) -> SecretApiKey:
    try:
        api_key_doc = db().collection(f"v1/public/users/{user.uid}/api-keys").document()
        key = generate_api_key(user, details, api_key_doc.id)
        api_key_doc.set({
            "name": key.name,
            "public_key": key.public_key,
            "secret_suffix": key.secret_suffix,
            "created_at": key.created_at
        })
        return key
    except Exception as e:
        print("Error creating token: {0}".format(e))
        raise HTTPException(status_code=401, detail="Invalid credentials")


@router.delete("/auth/api-key/{key_id}")
def delete_api_key(key_id: str, user: FirebaseUser = Depends(authenticated_access_token)) -> str:
    try:
        db().collection(f"v1/public/users/{user.uid}/api-keys").document(key_id).delete()
        return "Deleted"
    except Exception as e:
        print("Error deleting token: {0}".format(e))
        raise HTTPException(status_code=401, detail="Invalid credentials")


@router.get("/auth/api-key/{key_id}")
def get_api_key(key_id: str, user: FirebaseUser = Depends(authenticated_access_token)) -> SavedApiKey:
    try:
        document = db().collection(f"v1/public/users/{user.uid}/api-keys").document(key_id)
        return SavedApiKey(id=document.id, **document.get().to_dict())
    except Exception as e:
        print("Error fetching token: {0}".format(e))
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
