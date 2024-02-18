from pydantic import Field, BaseModel

from lib.utils import now
from pydantic import Field, BaseModel

from lib.utils.now import now


class HasName(BaseModel):
    name: str = Field(title="Name")


class HasVersion(BaseModel):
    version: str = Field(title="version")


class PipRequirement(HasName, HasVersion):
    name: str = Field(title="Name of the requirement")
    version: str = Field(title="Version of the requirement")


class HasCode(BaseModel):
    code: str = Field(
        title="Code",
        description="The code that will be used to execute the agent."
    )


class HasIgnore(BaseModel):
    ignore: list[str] = Field([], title="Ignore")


class HasRequirements(BaseModel):
    requirements: list[PipRequirement] = Field(
        title="Requirements",
        description="The list of requirements that the agent must satisfy in order to be used."
    )


class CodeAndIgnore(HasCode, HasIgnore):
    ...


class SkillSpecification(HasCode, HasRequirements):
    name: str = Field(
        title="Name",
        description="The name of the agent that will be used to identify it in the system."
    )

    class Config:
        description = "The specification of an agent that can be used to interact with the user."
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
