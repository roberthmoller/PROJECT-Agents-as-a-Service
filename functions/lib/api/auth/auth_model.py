from firebase_admin.auth import UserRecord
from pydantic import Field, BaseModel
from starlette.authentication import BaseUser


class FirebaseUser(BaseModel, BaseUser):
    uid: str = Field()
    email: str = Field()
    email_verified: bool = Field()
    disabled: bool = Field()
    custom_claims: dict = Field()
    name: str | None = Field()
    photo_url: str | None = Field()
    phone_number: str | None = Field()

    @staticmethod
    def of(user: UserRecord):
        return FirebaseUser(
            uid=user.uid,
            name=user.display_name,
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
