from pydantic import Field, BaseModel

from lib.utils import now
from pydantic import Field, BaseModel

from lib.utils.now import now



class Code(BaseModel):
    code: str = Field(
        title="Code",
        description="The code that will be used to execute the agent."
    )




class Requirements(BaseModel):
    requirements: str = Field(
        "",
        title="Requirements",
        description="The list of requirements that the skill must satisfy in order to be used."
    )




class SkillSpecification(BaseModel):
    name: str = Field(
        title="Name",
        description="The name of the skill that will be used to identify it in the system."
    )
    description: str = Field(
        "",
        title="Description",
        description="The description of the skill that will be used to describe it in the system."
    )
    requirements: str = Field(
        "",
        title="Requirements",
        description="The list of requirements that the skill must satisfy in order to be used."
    )
    code: str = Field(
        title="Code",
        description="The code that will be used to execute the agent."
    )


    class Config:
        description = "The specification of an skill that can be used to interact with the user."
        json_schema_extra = {
            "example": {

            }
        }


class SavedSkillSpecification(SkillSpecification):
    id: str = Field(title="The unique identifier of the skill")
    updated_at: str = Field(
        default_factory=now,
        title="The date and time when the agent was last updated"
    )

    @staticmethod
    def from_ref(ref):
        return SavedSkillSpecification(id=ref.id, **ref.to_dict())

    class Config:
        description = "The specification of an agent that can be used to interact with the user."
        json_schema_extra = {
            "example": {
                "name": "Pirate Paul",
                "system_message": "You are a helpful pirate agent who is always ready to help the user."
            }
        }
