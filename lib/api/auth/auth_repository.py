from lib.api.auth.auth_model import UserSchema
from lib.utils.crud_repository import CRUDRepository


class UserRepository(CRUDRepository):
    __type__ = UserSchema

    # def get_by_email(self, email: str) -> User:
    #     # return self.database.query(User).filter(User.email == email).first(
