import datetime
import os

from fastapi import APIRouter, Body, Query, HTTPException
from autogen import AssistantAgent, UserProxyAgent, GroupChat, GroupChatManager
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from lib.api.agent.agent_model import AgentModel
from lib.api.session.session_model import SessionModel
from lib.utils.firebase import db
from datetime import datetime

router = APIRouter(
    prefix="/session",
    tags=["Session"],
)

load_dotenv()

llm_config = {
    "cache_seed": 42,
    "temperature": 0,
    "config_list": [
        {"model": "gpt-3.5-turbo", "api_key": os.environ["OPENAI_API_KEY"]}
    ]
}


class MessageModel(BaseModel):
    id: str = Field(str)
    content: str = Field(str)
    sender: str = Field(str)
    recipient: str = Field(str)
    sent_at: str = Field(str)


@router.post("/")
def create_session(agent_ids: list[str]) -> SessionModel:
    print("Create session with agents: {0}".format(agent_ids))
    document = db.collection("sessions").document()
    document.set({"agents": agent_ids})
    return SessionModel(id=document.id, agents=agent_ids)


class SessionSummary(BaseModel):
    id: str
    agents: list[AgentModel]
    messages: list[MessageModel]


@router.get("/{session_id}")
def get_summary(session_id: str) -> SessionSummary:
    session_ref = db.collection("sessions").document(session_id)
    messages_ref = session_ref.collection("messages").order_by("sent_at")
    agents_ref = db.collection("agents")

    if not session_ref.get().exists:
        print(f"Session {session_id} not found")
        raise HTTPException(status_code=404, detail="Session not found")

    session = SessionModel(id=session_ref.id, **session_ref.get().to_dict())
    print("Session: {0}".format(session))
    agents = [
        AgentModel(id=agent_id, **agents_ref.document(agent_id).get().to_dict())
        for agent_id in session.agents
    ]
    print("Agents: {0}".format(agents))
    messages = [MessageModel(id=message.id, **message.to_dict()) for message in messages_ref.get()]
    print("Existing messages: {0}".format(messages))

    return SessionSummary(
        id=session.id,
        agents=agents,
        messages=messages
    )


@router.post("/{session_id}")
def send_message(session_id: str, message_content: str = Body(str)) -> SessionSummary:
    summary = get_summary(session_id)
    print("Summary: {0}".format(summary))
    print("Sending message: {0}".format(message_content))

    proxy = UserProxyAgent(
        name="UserProxy",
        human_input_mode="NEVER",
        max_consecutive_auto_reply=0,
        code_execution_config={
            "work_dir": "coding",
            "use_docker": False
        },
        is_termination_msg=lambda x: x.get("content", "").rstrip().endswith("TERMINATE"),
    )

    # Create assistants from agents specs
    print("Creating agents")
    agents = {
        agent.name: AssistantAgent(
            llm_config=llm_config,
            name=agent.name,
            system_message=f"{agent.system_message}. Reply 'TERMINATE' in the end when everything is done."
        )
        for agent in summary.agents
    }

    # Insert message history into session
    print("Inserting message history")
    for message in summary.messages:
        if message.sender == "UserProxy":
            recipent = agents[message.recipient]
            proxy.send(str(message.content), recipent, request_reply=False)
        else:
            sender = agents[message.sender]
            sender.send(str(message.content), proxy, request_reply=False)
    print("Message history inserted", proxy.chat_messages)

    #     Save user message
    session_ref = db.collection("sessions").document(session_id)
    messages_ref = session_ref.collection("messages")

    if len(agents) == 1:
        agent = next(iter(agents.values()))
        sending_ref = messages_ref.document()
        sending = MessageModel(
            id=sending_ref.id,
            content=str(message_content),
            sender="UserProxy",
            recipient=agent.name,
            sent_at=str(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        )
        sending_ref.set({
            "content": sending.content,
            "sender": sending.sender,
            "recipient": sending.recipient,
            "sent_at": sending.sent_at
        })
        summary.messages.append(sending)
        proxy.initiate_chat(agent, message=str(message_content), clear_history=False)

        response_ref = messages_ref.document()
        response = MessageModel(
            id=response_ref.id,
            content=str(proxy.last_message(agent)["content"]),
            sender=agent.name,
            recipient="UserProxy",
            sent_at=str(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        )
        response_ref.set({
            "content": response.content,
            "sender": response.sender,
            "recipient": response.recipient,
            "sent_at": response.sent_at
        })
        summary.messages.append(response)

    return SessionSummary(
        id=session_id,
        agents=summary.agents,
        messages=summary.messages
    )

    #
    # if len(assistants) == 1:
    #     assistant = next(iter(assistants.values()))
    #     proxy.initiate_chat(assistant, message=message)

    # messages_ref.add({"content": message})
    # agent = AssistantAgent(
    #     llm_config=llm_config,
    #     name="HelpfulAssistant",
    #     system_message="""
    #     You are a helpful AI assistant that talks like a pirate. Think out loud and solve their problem step by step.
    #     Reply "TERMINATE" in the end when everything is done.
    #     """
    # )

    # proxy.initiate_chat(agent, message=message)
    #
    # proxy.send()

    # return proxy.last_message(agent).get("content", "")
