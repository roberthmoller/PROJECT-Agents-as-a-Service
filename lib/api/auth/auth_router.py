from datetime import timedelta
from typing import Annotated

from fastapi import Depends, HTTPException, status, Body, APIRouter
from fastapi.security import OAuth2PasswordRequestForm

from lib.api.auth.auth_model import Token, UserModel
from lib.api.auth.auth_repository import UserRepository
from lib.api.auth.auth_utils import authenticate_user, ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, \
    get_current_active_user

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.post("/")
async def login_for_access_token(
        form_data: OAuth2PasswordRequestForm = Depends(),
        repo: UserRepository = Depends(UserRepository),
) -> Token:
    user = authenticate_user(repo, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


# Example of guarded routes

@router.get("/")
async def read_users_me(current_user: Annotated[UserModel, Depends(get_current_active_user)]):
    return current_user


@router.get("/users/me/items/")
async def read_own_items(current_user: Annotated[UserModel, Depends(get_current_active_user)]):
    return [{"item_id": "Foo", "owner": current_user.username}]
