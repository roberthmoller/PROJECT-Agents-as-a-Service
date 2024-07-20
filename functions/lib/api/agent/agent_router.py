from fastapi import APIRouter, HTTPException, Depends

from lib.api.auth.auth_model import FirebaseUser
from lib.api.agent.agent_model import AgentSpecification, SavedAgentSpecification
from lib.utils.firebase.admin import db
from lib.utils.auth_utils import user_scope

router = APIRouter(
    prefix="/agents",
    tags=["Agent"],
)


@router.options("", include_in_schema=False)
def options():
    return {"methods": ["GET", "POST"]}


@router.get("", description="List all agents you have access to")
def list_agents(user: FirebaseUser = Depends(user_scope)) -> list[SavedAgentSpecification]:
    print("Listing agents")
    agents_data = db().collection(f"v1/public/users/{user.uid}/agents").get()
    print("Agents data: {0}".format(agents_data))
    return list(map(lambda agent: SavedAgentSpecification(id=agent.id, **agent.to_dict()), agents_data))


@router.post("", description="Create a new agent")
def create_agent(agent: AgentSpecification, user: FirebaseUser = Depends(user_scope)) -> SavedAgentSpecification:
    print("Create agent: {0}".format(agent))
    agent.name = agent.name.strip()
    document = db().collection(f"v1/public/users/{user.uid}/agents").document()
    document.set(agent.model_dump())
    return SavedAgentSpecification(id=document.id, **agent.model_dump())


@router.options("/{agent_id}", include_in_schema=False)
def options(agent_id: str):
    return {"methods": ["GET", "PUT", "DELETE"]}


@router.get("/{agent_id}", description="Get a specific agent by its ID")
def get_agent(agent_id: str, user: FirebaseUser = Depends(user_scope)) -> SavedAgentSpecification:
    print("Get agent: {0}".format(agent_id))
    agent = db().collection(f"v1/public/users/{user.uid}/agents").document(agent_id).get()
    if not agent.exists:
        print(f"Agent {agent_id} not found")
        raise HTTPException(status_code=404, detail="Agent not found")
    return SavedAgentSpecification(id=agent.id, **agent.to_dict())


@router.put("/{agent_id}", description="Update a specific agent by its ID")
def update_agent(agent_id: str, agent: AgentSpecification,
                 user: FirebaseUser = Depends(user_scope)) -> SavedAgentSpecification:
    print("Update agent {0}: {1}".format(agent_id, agent))
    agent.name = agent.name.strip()
    document = db().collection(f"v1/public/users/{user.uid}/agents").document(agent_id)
    document.set(agent.model_dump())
    return SavedAgentSpecification(id=document.id, **agent.model_dump())


@router.delete("/{agent_id}", description="Delete a specific agent by its ID")
def delete_agent(agent_id: str, user: FirebaseUser = Depends(user_scope)) -> None:
    print("Delete agent: {0}".format(agent_id))
    document = db().collection(f"v1/public/users/{user.uid}/agents").document(agent_id)
    document.delete()
