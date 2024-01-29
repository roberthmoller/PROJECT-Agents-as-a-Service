from abc import abstractmethod, ABC
from typing import TypeVar, Callable, Generic, Union

from fastapi import APIRouter, Depends, Body

from lib.utils.crud_repository import CRUDRepository
from lib.utils.model import Schema, Model

UI = TypeVar('UI')
DB = TypeVar('DB', bound=Schema)
R = TypeVar('R', bound=CRUDRepository)


class CRUDRouter(Generic[R, UI, DB], ABC):
    @property
    @abstractmethod
    def repo(self) -> Callable[..., R]:
        ...

    @property
    @abstractmethod
    def model(self) -> Callable[..., UI]:
        ...

    @property
    @abstractmethod
    def router(self) -> APIRouter:
        ...

    @abstractmethod
    def to_schema(self, item: dict) -> DB:
        ...

    @abstractmethod
    def to_model(self, item: DB) -> UI:
        ...

    def __init__(self):
        @self.router.get("/")
        def get_agents(repository: R = Depends(self.repo)) -> list[UI]:
            items = map(lambda item: self.to_model(item), repository.list())
            return list(items)

        @self.router.post("/")
        def create_agent(create: UI = Body(self.model), repository: R = Depends(self.repo)) -> UI:
            model = self.model(**create)
            entity = self.to_schema(model)
            item = repository.create(entity)
            return self.to_model(item)

        @self.router.get("/{identifier}")
        def get_agent(identifier: str | int, repository: R = Depends(self.repo)) -> UI | None:
            item = repository.get(identifier)
            if item is not None:
                return self.to_model(item)

        @self.router.put("/{identifier}")
        def update_agent(identifier: str | int, values: dict, repository: R = Depends(self.repo)) -> UI | None:
            item = repository.update(identifier, values)
            if item is not None:
                return self.to_model(item)

        @self.router.delete("/{identifier}")
        def delete_agent(identifier: str | int, repository: R = Depends(self.repo)) -> None:
            repository.delete(identifier)
