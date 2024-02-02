from lib.utils.model import Schema
from pydantic import BaseModel, Field


class SessionModel(BaseModel):
    id: str | None = Field(default=None, title="The unique identifier of the item")
    agents: list[str] = Field(default=None, title="The description of the item", max_length=300)

    class Config:
        json_schema_extra = {
            "example": {
                "agents": ["eTTR6balvIwbpaWAVgAv"],
            }
        }
