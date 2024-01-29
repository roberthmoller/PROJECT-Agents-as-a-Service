from lib.api.agent.agent_model import AgentSchema
from lib.utils.crud_repository import CRUDRepository


class AgentRepository(CRUDRepository):
    __type__ = AgentSchema
