from fastapi import APIRouter, Depends, HTTPException
from pipreqs import pipreqs

from lib.api.auth.auth_model import FirebaseUser
from lib.api.skills.skill_model import SkillSpecification, SavedSkillSpecification, HasRequirements, CodeAndIgnore
from lib.api.skills.skill_utils import imports_from_code
from lib.utils.auth_utils import user_scope
from lib.utils.firebase.admin import db

router = APIRouter(
    prefix="/skills",
    tags=["Skills"],
)


@router.options("", include_in_schema=False)
def options():
    return {"methods": ["GET", "POST"]}


@router.get("", description="List all skills you have access to")
def list_skills(user: FirebaseUser = Depends(user_scope)) -> list[SavedSkillSpecification]:
    print("Listing skills")
    skills_data = db().collection(f"v1/public/users/{user.uid}/skills").get()
    print("Skill data: {0}".format(skills_data))
    return list(map(lambda agent: SavedSkillSpecification(id=agent.id, **agent.to_dict()), skills_data))


@router.post("", description="Create a new skill")
def create_skill(skill: SkillSpecification, user: FirebaseUser = Depends(user_scope)) -> SavedSkillSpecification:
    print("Create skill: {0}".format(skill))
    skill.name = skill.name.strip()
    document = db().collection(f"v1/public/users/{user.uid}/skills").document()
    document.set(skill.model_dump())
    return SavedSkillSpecification(id=document.id, **skill.model_dump())


@router.options("/requirements", include_in_schema=False)
def options():
    return {"methods": ["DELETE"]}


@router.post("/requirements", description="Create a new skill", dependencies=[Depends(user_scope)])
def skill_requirements(codeAndIgnore: CodeAndIgnore) -> HasRequirements:
    print("find requirements for code:\n{0}".format(codeAndIgnore))
    try:
        imports = imports_from_code(codeAndIgnore.code)
        print("imports:\n{0}".format(imports))
        imports = list(filter(lambda x: x not in codeAndIgnore.ignore, imports))
        print("filtered imports:\n{0}".format(imports))
        requirements = pipreqs.get_imports_info(imports)
        print("requirements:\n{0}".format(requirements))
        return HasRequirements(requirements=requirements)
    except Exception as e:
        print("Error: {0}".format(e))
        raise HTTPException(status_code=400, detail="Could not find requirements for the given code")

# @router.options("/{agent_id}")
# def options(agent_id: str):
#     return {"methods": ["GET", "PUT", "DELETE"]}
#
#
# @router.get("/{agent_id}", description="Get a specific agent by its ID")
# def get_agent(agent_id: str, user: FirebaseUser = Depends(user_scope)) -> SavedAgentSpecification:
#     print("Get agent: {0}".format(agent_id))
#     agent = db().collection(f"v1/public/users/{user.uid}/agents").document(agent_id).get()
#     if not agent.exists:
#         print(f"Agent {agent_id} not found")
#         raise HTTPException(status_code=404, detail="Agent not found")
#     return SavedAgentSpecification(id=agent.id, **agent.to_dict())
#
#
# @router.put("/{agent_id}", description="Update a specific agent by its ID")
# def update_agent(agent_id: str, agent: AgentSpecification,
#                  user: FirebaseUser = Depends(user_scope)) -> SavedAgentSpecification:
#     print("Update agent {0}: {1}".format(agent_id, agent))
#     agent.name = agent.name.strip()
#     document = db().collection(f"v1/public/users/{user.uid}/agents").document(agent_id)
#     document.set(agent.model_dump())
#     return SavedAgentSpecification(id=document.id, **agent.model_dump())
#
#
# @router.delete("/{agent_id}", description="Delete a specific agent by its ID")
# def delete_agent(agent_id: str, user: FirebaseUser = Depends(user_scope)) -> None:
#     print("Delete agent: {0}".format(agent_id))
#     document = db().collection(f"v1/public/users/{user.uid}/agents").document(agent_id)
#     document.delete()
