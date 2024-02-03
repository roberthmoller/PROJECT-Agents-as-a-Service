from pydantic import Field, BaseModel


class AgentSpecification(BaseModel):
    name: str = Field(title="The display name of the agent")
    system_message: str = Field(title="The rules for the agent's behavior")

    class Config:
        description = "The specification of an agent that can be used to interact with the user."
        json_schema_extra = {
            "example": {
                "name": "Pirate Paul",
                "system_message": "You are a helpful pirate agent who is always ready to help the user."
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
