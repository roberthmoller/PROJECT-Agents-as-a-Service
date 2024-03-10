from typing import List

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

from lib.api.agent.llm_model import LlmModel, OpenAILlmModel, GroqLlmModel
from lib.api.auth.auth_model import FirebaseUser
from lib.utils.auth_utils import authenticated
from lib.utils.firebase.admin import db
from lib.utils.now import now

router = APIRouter(
    prefix="/providers",
    tags=["Providers"],
)


class ModelDetails(BaseModel):
    id: str
    name: str
    canCallSkills: bool
    description: str = ""
    strengths: str = ""

    @staticmethod
    def from_llm_model(llm_model: LlmModel):
        return ModelDetails(
            id=llm_model.name,
            name=llm_model.value,
            canCallSkills=llm_model.can_call_skills,
            description=llm_model.description,
            strengths=llm_model.strengths
        )


class ModelProvider(BaseModel):
    name: str
    logo: str
    api_url: str
    api_key_url: str
    models: List[ModelDetails]


class ModelProviderConnection(ModelProvider):
    id: str
    isConnected: bool


class ModelConnection(BaseModel):
    api_key: str


providers = {
    'openai': ModelProvider(
        name="OpenAI",
        logo="https://openai.com/favicon.ico",
        api_url="https://openai.com",
        api_key_url="https://platform.openai.com/api-keys",
        models=[ModelDetails.from_llm_model(e) for e in OpenAILlmModel]
    ),
    'groq': ModelProvider(
        name="Groq",
        logo="https://groq.com/favicon.ico",
        api_url="https://api.groq.com",
        api_key_url="https://console.groq.com/keys",
        models=[ModelDetails.from_llm_model(e) for e in GroqLlmModel]
    ),
}


# todo: Add more details about the models and the providers as well as pricing information


@router.options("")
def options():
    return {"methods": ["GET"]}


@router.get("")
def list_providers(user: FirebaseUser = Depends(authenticated)) -> List[ModelProviderConnection]:
    linked_providers = [linked.id for linked in db().collection(f"v1/public/users/{user.uid}/providers").get()]

    return [
        ModelProviderConnection(
            id=key,
            **provider.model_dump(),
            isConnected=key in linked_providers
        )
        for key, provider in providers.items()
    ]


@router.options("/{provider}")
def options(provider: str):
    return {"methods": ["GET", "POST", "DELETE"]}


@router.get("/{provider}")
def get_provider(provider: str, user: FirebaseUser = Depends(authenticated)) -> ModelProviderConnection:
    if provider not in providers.keys():
        raise HTTPException(status_code=404, detail="Provider not found")

    linked_provider = db().collection(f"v1/public/users/{user.uid}/providers").document(provider).get()

    return ModelProviderConnection(
        id=provider,
        **providers[provider].model_dump(),
        isConnected=linked_provider.exists
    )


@router.post("/{provider}")
def connect_provider(
        provider: str,
        connection: ModelConnection,
        user: FirebaseUser = Depends(authenticated)
) -> ModelProviderConnection:
    print(f"Connecting to {provider} with {connection.api_key}")
    if provider not in providers.keys():
        raise HTTPException(status_code=404, detail="Provider not found")

    linked_providers = db().collection(f"v1/public/users/{user.uid}/providers")
    linked_providers.document(provider).set({
        "api_key": connection.api_key,
        "connected_at": now()
    })

    return ModelProviderConnection(
        id=provider,
        **providers[provider].model_dump(),
        isConnected=True
    )


@router.delete("/{provider}")
def disconnect_provider(provider: str, user: FirebaseUser = Depends(authenticated)) -> ModelProviderConnection:
    print(f"Disconnecting from {provider}")
    if provider not in providers.keys():
        raise HTTPException(status_code=404, detail="Provider not found")

    linked_providers = db().collection(f"v1/public/users/{user.uid}/providers")
    linked_providers.document(provider).delete()

    return ModelProviderConnection(
        id=provider,
        **providers[provider].model_dump(),
        isConnected=False
    )
