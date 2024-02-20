from typing import Union

from pydantic import Field, BaseModel

from lib.utils.now import now
from .llm_model import OpenAILlmModel, LocalLlmModel


class AgentSpecification(BaseModel):
    name: str = Field(
        title="Name",
        description="The name of the agent that will be used to identify it in the system."
    )
    system_message: str = Field(
        title="System message",
        description="The message that the agent will send to the user when it is first connected"
    )
    models: list[Union[LocalLlmModel, OpenAILlmModel]] = Field(
        [OpenAILlmModel.gpt_3_5_turbo],
        title="Model",
        description="The list of models that the agent can use to generate responses",
        min_items=1,
    )
    skills: list[str] = Field(
        [],
        title="Skills",
        description="The list of skills that the agent can apply to the user's requests.",
    )
    description: str = Field(
        title="Description",
        description="A description of the agent for the user to be able to understand what the agent is about."
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
    created_at: str = Field(
        default_factory=now,
        title="The date and time when the agent was created",
    )

    class Config:
        description = "The specification of an agent that can be used to interact with the user."
        json_schema_extra = {
            "example": {
                "name": "Pirate Paul",
                "system_message": "You are a helpful pirate agent who is always ready to help the user.",
                "description": "A helpful pirate agent who is always ready to help the user.",
                "models": ["gpt-3.5-turbo"],
                "skills": ["skill_id_1", "skill_id_2"],
                "cache_seed": 42,
                "temperature": 0
            }
        }


class SavedAgentSpecification(AgentSpecification):
    id: str = Field(title="The unique identifier of the agent")

    updated_at: str = Field(
        default_factory=now,
        title="The date and time when the agent was last updated"
    )

    @staticmethod
    def from_ref(ref):
        return SavedAgentSpecification(id=ref.id, **ref.to_dict())

    class Config:
        description = "The specification of an agent that can be used to interact with the user."
        json_schema_extra = {
            "example": {
                "name": "Pirate Paul",
                "system_message": "You are a helpful pirate agent who is always ready to help the user."
            }
        }
