from enum import Enum
from typing import Literal

from pydantic import Field, BaseModel

Model = Literal[
    "gpt-4-0125-preview", "gpt-4-turbo-preview", "gpt-4-1106-preview", "gpt-4", "gpt-4-0613", "gpt-4-32k", "gpt-4-32k-0613",
    "gpt-3.5-turbo-0125", "gpt-3.5-turbo", "gpt-3.5-turbo-1106", "gpt-3.5-turbo-instruct",
]


class AgentSpecification(BaseModel):
    name: str = Field(
        title="Name",
        description="The name of the agent that will be used to identify it in the system."
    )
    system_message: str = Field(
        title="System message",
        description="The message that the agent will send to the user when it is first connected"
    )
    models: list[Model] = Field(
        ["gpt-3.5-turbo"],
        title="Model",
        description="The list of models that the agent can use to generate responses",
        min_items=1,
    )
    cache_seed: int = Field(
        42,
        title="Cache seed",
        description="The cache seed used to initialize the agent's random number generator"
    )
    temperature: int = Field(
        0,
        title="Temperature",
        description="The temperature of the agent's response generation process"
    )

    class Config:
        description = "The specification of an agent that can be used to interact with the user."
        json_schema_extra = {
            "example": {
                "name": "Pirate Paul",
                "system_message": "You are a helpful pirate agent who is always ready to help the user.",
                "models": ["gpt-3.5-turbo"],
                "cache_seed": 42,
                "temperature": 0
            }
        }


class SavedAgentSpecification(AgentSpecification):
    id: str = Field(title="The unique identifier of the agent")

    @staticmethod
    def from_ref(ref):
        return AgentSpecification(id=ref.id, **ref.to_dict())

    class Config:
        description = "The specification of an agent that can be used to interact with the user."
        json_schema_extra = {
            "example": {
                "name": "Pirate Paul",
                "system_message": "You are a helpful pirate agent who is always ready to help the user."
            }
        }
