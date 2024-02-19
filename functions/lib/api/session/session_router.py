from fastapi import APIRouter, Body, HTTPException, Depends, Path

from fastapi import APIRouter, Body, HTTPException, Depends, Path

from lib.api.agent.agent_model import SavedAgentSpecification
from lib.api.auth.auth_model import FirebaseUser
from lib.api.session.assistant_utils import initialize_chat
from lib.api.session.message_model import SavedMessageModel, MessageContentModel
from lib.api.session.session_model import SessionSpecification, SavedSessionSpecification, Session
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
def list_sessions(user: FirebaseUser = Depends(user_scope)) -> list[Session]:
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
def send_message(session_id: str = Path(),
                 message: MessageContentModel = Body(),
                 user: FirebaseUser = Depends(user_scope)
                 ) -> Session:
    summary = get_summary(session_id, user=user)
    user, recipient = initialize_chat(user, summary)
    user.send(message=message.content, recipient=recipient, request_reply=True)
    return summary
