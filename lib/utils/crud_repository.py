from abc import ABC

from lib.utils.repository import Repository, T


class CRUDRepository(Repository, ABC):

    def list(self) -> list[T]:
        return self.database.query(self.__type__).all()

    def get(self, identity: str | int) -> T | None:
        return self.database.get(self.__type__, identity)

    def create(self, item: T) -> T:
        self.database.add(item)
        self.database.commit()
        self.database.refresh(item)
        return item

    def update(self, identity: str | int, values: dict) -> T:
        item = self.get(identity)
        # self.database.execute(
        #     update(self.__type__)
        #     .where(self.__type__.id == id)
        #     .values(item.fields())
        # )
        for key, value in values.items():
            setattr(item, key, value)
        self.database.commit()
        self.database.refresh(item)
        return item

    def delete(self, identity: str | int) -> None:
        self.database.delete(self.get(identity))
        self.database.commit()
