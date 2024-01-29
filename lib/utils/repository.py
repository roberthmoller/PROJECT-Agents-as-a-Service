from abc import ABC, abstractmethod
from typing import Annotated, TypeVar
from fastapi import Depends
from lib.utils.database import Database, Schema

T = TypeVar('T', bound=Schema)


class Repository(ABC):
    def __init__(self, database: Annotated[Database, Depends(Database)]):
        self.database = database

    @property
    @abstractmethod
    def __type__(self) -> type[T]:
        ...
