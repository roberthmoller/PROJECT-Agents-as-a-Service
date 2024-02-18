from fastapi import Depends, HTTPException
from firebase_admin import auth
from firebase_admin.auth import UserRecord

from lib.api.auth.auth_model import FirebaseUser
from lib.api.auth.auth_scheme import bearer_scheme


def authenticated(bearer=Depends(bearer_scheme)) -> FirebaseUser:
    token = bearer.credentials
    try:
        authorization = auth.verify_id_token(token)
    except Exception as e:
        print("Error verifying token: {0}".format(e))
        raise HTTPException(status_code=401, detail="Invalid token")

    try:
        user: UserRecord = auth.get_user(authorization["uid"])
        return FirebaseUser.of(user)
    except Exception as e:
        print("Error getting user: {0}".format(e))
        raise HTTPException(status_code=404, detail="User not found")


def scope(required_scope: str):
    def require_scope(user: FirebaseUser = Depends(authenticated)):
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
