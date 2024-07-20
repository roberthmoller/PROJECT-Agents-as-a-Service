from datetime import datetime
from typing import List

from fastapi import APIRouter, Body, HTTPException, Depends, Path

from lib.api.session.session_model import Session
from lib.api.agent.agent_model import SavedAgentSpecification
from lib.api.auth.auth_model import FirebaseUser
from lib.api.session.assistant_utils import initialize_chat
from lib.api.session.message_model import SavedMessageModel, MessageContentModel
from lib.api.session.session_model import SessionSpecification, SavedSessionSpecification, Session
from lib.api.session.usage_utils import calculate_and_record_usage, UsageModel
from lib.utils.auth_utils import user_scope
from lib.utils.firebase.admin import db

router = APIRouter(
    prefix="/sessions",
    tags=["Session"],
)


@router.options("", include_in_schema=False)
def options():
    return {"methods": ["GET", "POST"]}


@router.get("")
def list_sessions(user: FirebaseUser = Depends(user_scope)) -> List[Session]:
    return list(map(
        lambda document: get_summary(document.id),
        db().collection(f"v1/public/users/{user.uid}/sessions").get()
    ))


@router.post("")
def create_session(
        session: SessionSpecification = Body(),
        user: FirebaseUser = Depends(user_scope)
) -> SavedSessionSpecification:
    document = db().collection(f"v1/public/users/{user.uid}/sessions").document()
    document.set(session.model_dump())
    return SavedSessionSpecification(id=document.id, **session.model_dump())


@router.options("/{session_id}", include_in_schema=False)
def options(session_id: str):
    return {"methods": ["GET", "POST"]}


@router.get("/{session_id}")
def get_summary(
        session_id: str = Path(),
        user: FirebaseUser = Depends(user_scope)
) -> Session:
    session_ref = db().collection(f"v1/public/users/{user.uid}/sessions").document(session_id)
    messages_ref = session_ref.collection("messages").order_by("sent_at")
    agents_ref = db().collection(f"v1/public/users/{user.uid}/agents")
    session_doc = session_ref.get()
    if not session_doc.exists:
        print(f"Session {session_id} not found")
        raise HTTPException(status_code=404, detail="Session not found")

    session = SavedSessionSpecification(id=session_ref.id, **session_doc.to_dict())
    agents = [
        SavedAgentSpecification(id=agent_id, **agents_ref.document(agent_id).get().to_dict())
        for agent_id in session.agents
    ]
    messages = [SavedMessageModel(id=message.id, **message.to_dict()) for message in messages_ref.get()]
    messages.sort(key=lambda x: x.sent_at)

    return Session(
        id=session.id,
        agents=agents,
        messages=messages
    )


@router.post("/{session_id}")
def send_message(
        session_id: str,
        message: MessageContentModel,
        user: FirebaseUser = Depends(user_scope)
) -> Session:
    start_time = datetime.now()
    summary = get_summary(session_id, user=user)
    proxy, recipient, remaining_agents = initialize_chat(user, summary)
    message.role = message.role or proxy.name
    try:
        proxy.initiate_chat(recipient, message=message.model_dump(), clear_history=False)
    except Exception as e:
        print("Error sending message")
        print(e)
        end_time = datetime.now()
        calculate_and_record_usage(user, session_id, [proxy, recipient, *remaining_agents], start_time, end_time)
        raise HTTPException(status_code=500, detail="Failed to send message")

    end_time = datetime.now()
    calculate_and_record_usage(
        user,
        session_id,
        [proxy, recipient, *remaining_agents],
        start_time,
        end_time
    )
    return summary
