from firebase_admin.auth import UserRecord
from pydantic import Field, BaseModel
from starlette.authentication import BaseUser


def sanitize_name(display_name: str) -> str:
    return display_name \
        .replace("ø", "o").replace("Ø", "O") \
        .replace("æ", "ae").replace("Æ", "AE") \
        .replace("å", "aa").replace("Å", "AA")


# TODO: api key (key[hashed], name, active, created_at)
class ApiKey(BaseModel):
    name: str

class SavedApiKey(ApiKey):
    id: str
    key: str
    created_at: str

class FirebaseUser(BaseModel, BaseUser):
    uid: str = Field()
    email: str = Field()
    disabled: bool = Field(False)
    email_verified: bool = Field(False)
    custom_claims: dict = Field(dict())
    name: str | None = Field()
    photo_url: str | None = Field()
    phone_number: str | None = Field()

    @staticmethod
    def of(user: UserRecord):
        return FirebaseUser(
            uid=user.uid,
            name=sanitize_name(user.display_name),
            email=user.email,
            email_verified=user.email_verified,
            disabled=user.disabled,
            phone_number=user.phone_number,
            photo_url=user.photo_url,
            custom_claims=user.custom_claims or {},
        )

    @property
    def display_name(self) -> str:
        return self.name

    @property
    def is_authenticated(self) -> bool:
        return True

    @property
    def identity(self) -> str:
        return self.uid
