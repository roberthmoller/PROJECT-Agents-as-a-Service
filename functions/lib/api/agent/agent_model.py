from pydantic import Field, BaseModel
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from lib.utils.model import Schema


class AgentSchema(Schema):
    __tablename__ = "agent"
    id: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))

    def __repr__(self) -> str:
        return f"Agent(id={self.id!r}, name={self.name!r})"


class AgentModel(BaseModel):
    id: str | None = Field(default=None, title="The unique identifier of the item")
    name: str = Field(default=None, title="The description of the item", max_length=300)
    system_message: str = Field(default=None, title="The description of the item", max_length=300)
