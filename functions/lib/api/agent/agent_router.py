from fastapi import APIRouter, HTTPException, Depends

from lib.api.agent.agent_model import AgentSpecification, SavedAgentSpecification
from lib.utils.firebase.admin import db
from lib.utils.auth_utils import user_scope

router = APIRouter(
    prefix="/agent",
    tags=["Agent"],
)


@router.get("/", description="List all agents you have access to", dependencies=[Depends(user_scope)])
def list_agents() -> list[SavedAgentSpecification]:
    print("Listing agents")
    agents_data = db.collection("agents").get()
    print("Agents data: {0}".format(agents_data))
    return list(map(lambda agent: SavedAgentSpecification(id=agent.id, **agent.to_dict()), agents_data))


@router.post("/", dependencies=[Depends(user_scope)])
def create_agent(agent: AgentSpecification) -> SavedAgentSpecification:
    print("Create agent: {0}".format(agent))
    document = db.collection("agents").document()
    document.set(agent.model_dump())
    return SavedAgentSpecification(id=document.id, **agent.model_dump())


@router.get("/{agent_id}", description="Get a specific agent by its ID", dependencies=[Depends(user_scope)])
def get_agent(agent_id: str) -> SavedAgentSpecification:
    print("Get agent: {0}".format(agent_id))
    agent = db.collection("agents").document(agent_id).get()
    if not agent.exists:
        print(f"Agent {agent_id} not found")
        raise HTTPException(status_code=404, detail="Agent not found")
    return SavedAgentSpecification(id=agent.id, **agent.to_dict())


@router.put("/{agent_id}", dependencies=[Depends(user_scope)])
def update_agent(agent_id: str, agent: AgentSpecification) -> SavedAgentSpecification:
    print("Update agent {0}: {1}".format(agent_id, agent))
    document = db.collection("agents").document(agent_id)
    document.set(agent.model_dump())
    return SavedAgentSpecification(id=document.id, **agent.model_dump())


@router.delete("/{agent_id}", dependencies=[Depends(user_scope)])
def delete_agent(agent_id: str) -> None:
    print("Delete agent: {0}".format(agent_id))
    document = db.collection("agents").document(agent_id)
    document.delete()
