import os

from fastapi import APIRouter
from pyrebase import initialize_app as initialize_client_app

from lib.api.auth.auth_model import UserRegistration, UserLogin
from firebase_admin import auth

# from lib.api.auth.auth_model import Token, UserModel
# from lib.api.auth.auth_repository import UserRepository
# from lib.api.auth.auth_utils import authenticate_user, ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, \
#     get_current_active_user

firebase_config = {
    "apiKey": "AIzaSyBeHOHnHOWrvGt-T41BeAm2-iUD6svrbjU",
    "authDomain": "agents-as-a-service.firebaseapp.com",
    "projectId": "agents-as-a-service",
    "storageBucket": "agents-as-a-service.appspot.com",
    "messagingSenderId": "666361884823",
    "appId": "1:666361884823:web:618247285c2df5fe76b9d2",
    "measurementId": "G-9BFRGJBQG3",
    "databaseURL": "",
    "authURL": "127.0.0.1:9099",
}

# os.environ["FIREBASE_AUTH_EMULATOR_HOST"] = "127.0.0.1:9099"

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.get("/")
def read_root():
    return auth.get_user_by_email("john.doe@gmail.com")


@router.post("/register")
def register(details: UserRegistration):
    firebase = initialize_client_app(firebase_config)
    auth = firebase.auth()

    try:
        user = auth.create_user_with_email_and_password(email=details.email, password=details.password)
        auth.update_profile(user, display_name=details.name)
        print("User created: {0}".format(user))
        return user
    except Exception as e:
        print("Error creating user: {0}".format(e))
        return e
    # user = auth.create_user(email=details.email, password=details.password)
    # return auth.create_custom_token(user.uid)


@router.post("/login")
def login(details: UserLogin):
    try:
        firebase = initialize_client_app(firebase_config)
        auth = firebase.auth()
        user = auth.sign_in_with_email_and_password(email=details.email, password=details.password)
        print("User logged in: {0}".format(user))
        # user = auth.get_user_by_email(details.email)
        # auth.create_custom_token()
        return user
    except Exception as e:
        print("Error logging in: {0}".format(e))
        return e


@router.post("/token")
def token():
    pass

# @router.post("/")
# async def login_for_access_token(
#         form_data: OAuth2PasswordRequestForm = Depends(),
#         repo: UserRepository = Depends(UserRepository),
# ) -> Token:
#     user = authenticate_user(repo, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.username}, expires_delta=access_token_expires
#     )
#     return Token(access_token=access_token, token_type="bearer")
#
#
# # Example of guarded routes
#
# @router.get("/")
# async def read_users_me(current_user: Annotated[UserModel, Depends(get_current_active_user)]):
#     return current_user
#
#
# @router.get("/users/me/items/")
# async def read_own_items(current_user: Annotated[UserModel, Depends(get_current_active_user)]):
#     return [{"item_id": "Foo", "owner": current_user.username}]
