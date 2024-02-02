from pydantic import BaseModel
from sqlalchemy.orm import DeclarativeBase


class Model(BaseModel):
    pass




class Schema(DeclarativeBase):
    def fields(self):
        return dict(filter(lambda x: not x[0].startswith("_"), self.__dict__.items()))
