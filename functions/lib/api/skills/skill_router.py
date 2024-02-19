from fastapi import APIRouter, Depends, HTTPException, Body, Query, Path
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


@router.options("/{skill_id}")
def options(skill_id: str):
    return {"methods": ["GET", "PUT", "DELETE", "POST"]}


@router.get("/{skill_id}", description="Get a specific agent by its ID")
def get_skill(skill_id: str, user: FirebaseUser = Depends(user_scope)) -> SavedSkillSpecification:
    print("Get skill: {0}".format(skill_id))
    skill = db().collection(f"v1/public/users/{user.uid}/skills").document(skill_id).get()
    if not skill.exists:
        print(f"Skill {skill_id} not found")
        raise HTTPException(status_code=404, detail="Agent not found")
    return SavedSkillSpecification(id=skill.id, **skill.to_dict())


@router.put("/{skill_id}", description="Update a specific skill by its ID")
def update_skill(skill_id: str, skill: SkillSpecification,
                 user: FirebaseUser = Depends(user_scope)) -> SavedSkillSpecification:
    print("Update skill {0}: {1}".format(skill_id, skill))
    skill.name = skill.name.strip()
    document = db().collection(f"v1/public/users/{user.uid}/skills").document(skill_id)
    document.set(skill.model_dump())
    return SavedSkillSpecification(id=document.id, **skill.model_dump())


@router.delete("/{skill_id}", description="Delete a specific skill by its ID")
def delete_skill(skill_id: str, user: FirebaseUser = Depends(user_scope)) -> None:
    print("Delete skill: {0}".format(skill_id))
    document = db().collection(f"v1/public/users/{user.uid}/skills").document(skill_id)
    document.delete()


from .skill_utils import extract_methods


@router.post("/{skill_id}")
def options(
        skill_id: str = Path(),
        method: str = Query(),
        params: dict = Body(),
        user: FirebaseUser = Depends(user_scope)
) -> str:
    skill = get_skill(skill_id, user)
    methods = extract_methods(skill.code)
    if method not in methods:
        raise HTTPException(status_code=400, detail="Method not found")
    try:
        result = methods[method](**params)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return str(result)
