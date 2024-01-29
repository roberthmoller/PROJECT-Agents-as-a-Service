from fastapi import APIRouter

from lib.api.agent.agent_model import AgentModel, AgentSchema
from lib.api.agent.agent_repository import AgentRepository
from lib.utils.crud_router import CRUDRouter, UI, DB


class AgentRouter(CRUDRouter[AgentRepository, AgentModel, AgentSchema]):
    model = AgentModel
    entity = AgentSchema
    repo = AgentRepository
    router = APIRouter(
        prefix="/agent",
        tags=["agent"],
    )

    def to_schema(self, item: AgentModel) -> AgentSchema:
        assert item.name is not None, 'Must provide a name'
        return AgentSchema(
            name=item.name,
        )

    def to_model(self, item: AgentSchema) -> AgentModel:
        return AgentModel(
            id=item.id,
            name=item.name,
        )
