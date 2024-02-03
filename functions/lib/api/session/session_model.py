from pydantic import BaseModel, Field

from lib.api.session.message_model import SavedMessageModel
from lib.api.agent.agent_model import SavedAgentSpecification


class SessionSpecification(BaseModel):
    agents: list[str] = Field(title="The list of agents that should be part of the session.")

    class Config:
        json_schema_extra = {
            "example": {
                "agents": ["eTTR6balvIwbpaWAVgAv"],
            }
        }


class SavedSessionSpecification(SessionSpecification):
    id: str | None = Field(default=None, title="The unique identifier of the item")

    class Config:
        json_schema_extra = {
            "example": {
                "id": "eTTR6balvIwbpaWAVgAv",
                "agents": ["eTTR6balvIwbpaWAVgAv"],
            }
        }


class SessionSummary(BaseModel):
    id: str
    agents: list[SavedAgentSpecification]
    messages: list[SavedMessageModel]

    class Config:
        json_schema_extra = {
            "example": {
                "id": "eTTR6balvIwbpaWAVgAv",
                "agents": ["eTTR6balvIwbpaWAVgAv"],
                "messages": [
                    {
                        "id": "eTTR6balvIwbpaWAVgAv",
                        "content": "Hello!",
                        "sender": "user",
                        "recipient": "eTTR6balvIwbpaWAVgAv",
                        "sent_at": "2021-10-01 00:00:00"
                    }
                ]
            }
        }
