from fastapi import Depends
from sqlalchemy import create_engine, Engine
from sqlalchemy.orm import DeclarativeBase, Session
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from lib.utils.model import Schema


def sqlite_engine() -> Engine:
    return create_engine("sqlite:///test.db", echo=True, connect_args={"check_same_thread": False})


class Database(Session):
    def __init__(self, engine: Engine = Depends(sqlite_engine)):
        super().__init__(bind=engine)


def create_tables():
    Schema.metadata.create_all(sqlite_engine())


