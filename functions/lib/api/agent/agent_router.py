from fastapi import APIRouter
from firebase_admin import firestore

from lib.api.agent.agent_model import AgentModel
from lib.utils.firebase import db

# class AgentRouter(CRUDRouter[AgentRepository, AgentModel, AgentSchema]):
#     model = AgentModel
#     entity = AgentSchema
#     repo = AgentRepository
#     router = APIRouter(
#         prefix="/agent",
#         tags=["agent"],
#     )
#
#     def to_schema(self, item: AgentModel) -> AgentSchema:
#         assert item.name is not None, 'Must provide a name'
#         return AgentSchema(
#             name=item.name,
#         )
#
#     def to_model(self, item: AgentSchema) -> AgentModel:
#         return AgentModel(
#             id=item.id,
#             name=item.name,
#         )

router = APIRouter(
    prefix="/agent",
    tags=["Agent"],
)


@router.get("/")
def list_agents() -> list[AgentModel]:
    print("Listing agents")
    agents_data = db.collection("agents").get()
    print("Agents data: {0}".format(agents_data))
    for agent in agents_data:
        print(f'{agent.id} => {agent.to_dict()}')

    return map(lambda agent: AgentModel(id=agent.id, **agent.to_dict()), agents_data)
