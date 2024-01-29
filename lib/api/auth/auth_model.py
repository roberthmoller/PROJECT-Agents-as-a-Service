from pydantic import BaseModel
from sqlalchemy import String, Boolean
from sqlalchemy.orm import mapped_column, Mapped

from lib.utils.model import Schema


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class UserModel(BaseModel):
    email: str
    full_name: str | None = None
    disabled: bool | None = None


class UserSchema(Schema):
    __tablename__ = 'user'

    email: Mapped[str] = mapped_column(String(128), primary_key=True)
    full_name = mapped_column(String(128))
    disabled = mapped_column(Boolean())
    hashed_password = mapped_column(String(128))
