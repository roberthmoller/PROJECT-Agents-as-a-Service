import datetime
import os
from abc import abstractmethod
from datetime import datetime
from typing import Tuple, Union, Callable, List, Optional, Dict, Literal

from autogen import AssistantAgent, UserProxyAgent, Agent
from dotenv import load_dotenv
from fastapi import APIRouter, Body, HTTPException, Depends

from lib.api.agent.agent_model import SavedAgentSpecification
from lib.api.auth.auth_model import FirebaseUser
from lib.api.session.message_model import SavedMessageModel
from lib.api.session.session_model import SessionSpecification, SavedSessionSpecification, Session
from lib.utils.auth_utils import user_scope
from lib.utils.firebase.admin import db

router = APIRouter(
    prefix="/session",
    tags=["Session"],
)

load_dotenv()

deterministic_gpt35turbo_llm_config = {
    "cache_seed": 42,
    "temperature": 0,
    "config_list": [
        {"model": "gpt-3.5-turbo", "api_key": os.environ["OPENAI_API_KEY"]}
    ]
}


@router.post("/", dependencies=[Depends(user_scope)])
def create_session(session: SessionSpecification) -> SavedSessionSpecification:
    print("Create session: {0}".format(session))
    document = db().collection("sessions").document()
    document.set(session.model_dump())
    return SavedSessionSpecification(id=document.id, **session.model_dump())


@router.get("/{session_id}", dependencies=[Depends(user_scope)])
def get_summary(session_id: str) -> Session:
    session_ref = db().collection("sessions").document(session_id)
    messages_ref = session_ref.collection("messages").order_by("sent_at")
    agents_ref = db().collection("agents")

    if not session_ref.get().exists:
        print(f"Session {session_id} not found")
        raise HTTPException(status_code=404, detail="Session not found")

    session = SavedSessionSpecification(id=session_ref.id, **session_ref.get().to_dict())
    agents = [
        SavedAgentSpecification(id=agent_id, **agents_ref.document(agent_id).get().to_dict())
        for agent_id in session.agents
    ]
    messages = [SavedMessageModel(id=message.id, **message.to_dict()) for message in messages_ref.get()]
    messages.sort(key=lambda x: x.sent_at, reverse=True)

    return Session(
        id=session.id,
        agents=agents,
        messages=messages
    )


from autogen import GroupChat, GroupChatManager, ConversableAgent


class RecordableAgent(ConversableAgent):
    should_record: bool = False
    session: Session

    def _process_received_message(self, message: Union[Dict, str], sender: Agent, silent: bool):
        # print(f"{sender.name}(silent:{silent}): {message}")
        return super()._process_received_message(message, sender, silent)

    def send(self, message: Union[Dict, str], recipient: Agent, request_reply: Optional[bool] = None,
             silent: Optional[bool] = False):
        print(f"""
            =========v==========
            {self.name} -> {recipient.name}: {message}
            =========^==========
        """)
        content = str(message["content"]) if isinstance(message, Dict) else str(message)
        sender = str(message["name"]) if isinstance(message, Dict) else self.name
        if self.should_record and len(content) > 0:
            print("====> Recording message <====")
            session_collection = db().collection("sessions").document(self.session.id)
            messages_collection = session_collection.collection("messages")
            message_document = messages_collection.document()
            message = SavedMessageModel(
                id=message_document.id,
                content=content,
                sender=sender,
                sent_at=str(datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3])
            )
            message_document.set(message.to_message().model_dump())
            self.session.messages.append(message)
        return super().send(message, recipient, request_reply, silent)


class FirebaseAssistantAgent(AssistantAgent, RecordableAgent):

    def __init__(self, name: str, session: Session,
                 system_message: Optional[str] = AssistantAgent.DEFAULT_SYSTEM_MESSAGE,
                 llm_config: Optional[Union[Dict, Literal[False]]] = None,
                 is_termination_msg: Optional[Callable[[Dict], bool]] = None,
                 max_consecutive_auto_reply: Optional[int] = None, human_input_mode: Optional[str] = "NEVER",
                 description: Optional[str] = None, **kwargs):
        self.session = session
        super().__init__(name, system_message, llm_config, is_termination_msg, max_consecutive_auto_reply,
                         human_input_mode, description, **kwargs)


class FirebaseUserProxyAgent(UserProxyAgent, RecordableAgent):
    def __init__(self,
                 name: str,
                 session: Session,
                 is_termination_msg: Optional[Callable[[Dict], bool]] = None,
                 max_consecutive_auto_reply: Optional[int] = None, human_input_mode: Optional[str] = "ALWAYS",
                 function_map: Optional[Dict[str, Callable]] = None,
                 code_execution_config: Optional[Union[Dict, Literal[False]]] = None,
                 default_auto_reply: Optional[Union[str, Dict, None]] = "",
                 llm_config: Optional[Union[Dict, Literal[False]]] = False,
                 system_message: Optional[Union[str, List]] = "", description: Optional[str] = None):
        self.session = session
        super().__init__(name, is_termination_msg, max_consecutive_auto_reply, human_input_mode, function_map,
                         code_execution_config, default_auto_reply, llm_config, system_message, description)


if __name__ == '__main__':
    session = Session(
        id="test",
        agents=[
            SavedAgentSpecification(
                id="test",
                name="test",
                system_message="test"

            )
        ],
        messages=[]
    )
    proxy = FirebaseUserProxyAgent(
        session=session,
        name="UserProxy",
        human_input_mode="NEVER",
        max_consecutive_auto_reply=0,
        code_execution_config={
            "work_dir": "coding",
            "use_docker": False
        },
        is_termination_msg=lambda x: x.get("content", "").rstrip().endswith("TERMINATE"),
    )
    assistant = FirebaseAssistantAgent(
        session=session,
        llm_config=deterministic_gpt35turbo_llm_config,
        name="test",
        system_message="test"
    )
    proxy.send("test1", assistant, request_reply=False)
    proxy.should_record = True
    assistant.should_record = True

    proxy.initiate_chat(assistant, message="test2")


def initialize_chat(user: FirebaseUser, session: Session) -> Tuple[UserProxyAgent, ConversableAgent]:
    print("Initialize chat: {0}".format(session))
    # Create a user proxy agent
    proxy = FirebaseUserProxyAgent(
        session=session,
        name=(user.name or "User").replace(" ", "_"),
        human_input_mode="NEVER",
        code_execution_config={
            "work_dir": "work_dir",
            "use_docker": False
        },
        # todo: Consider taking this as a parameter for the session
        max_consecutive_auto_reply=10,
        is_termination_msg=lambda x: x.get("content", "").rstrip().endswith("TERMINATE"),
    )

    # Create assistants from agents specs
    agents: dict[str, Union[ConversableAgent, RecordableAgent]] = {
        agent.name: FirebaseAssistantAgent(
            session=session,
            llm_config={
                "cache_seed": agent.cache_seed,
                "temperature": agent.temperature,
                "config_list": [
                    {"model": model, "api_key": os.environ["OPENAI_API_KEY"]}
                    for model in agent.models
                ]
            },
            name=agent.name,
            system_message=f"""
            # {agent.name.replace("_", " ")}
            Your name is "{agent.name.replace("_", " ")}". Follow the system message to answer the user's question.
            ## System message
            {agent.system_message}.
            ## Rules
            - Reply 'TERMINATE' when you have answered the user.
            """,
            description=agent.system_message,
            is_termination_msg=lambda x: x.get("content", "").rstrip().endswith("TERMINATE"),
        )
        for agent in session.agents
    }
    # Insert message history into session

    # Decide if we need a chat or a manager
    if len(agents) == 1:
        chat = next(iter(agents.values()))
    else:
        admin = AssistantAgent(
            name="Admin",
            llm_config={
                "cache_seed": 42,
                "temperature": 0,
                "config_list": [
                    {"model": "gpt-3.5-turbo", "api_key": os.environ["OPENAI_API_KEY"]}
                ]
            },
            description="Chat admin responsible for managing the chat and ensuring the user's questions are answered.",
            system_message="""
            # Admin
            You are the admin of the chat. Your role is to manage the chat and ensure that the user's questions are answered.
            
            ## Rules
            - You are not allowed to answer the user's questions.
            - You are not allowed to ask the user questions.
            - Reply 'TERMINATE' when the user's questions are answered.
            - If the user's questions are not answered, you can ask the agents to answer the user's questions.
            """,
            is_termination_msg=lambda x: x.get("content", "").rstrip().endswith("TERMINATE"),
        )
        # Add silent admin agent
        group = GroupChat(
            agents=[proxy, agents.values()],
            messages=[],
            admin_name=admin.name,
            # speaker_selection_method="round_robin",
            speaker_selection_method="auto",
            # todo: Consider taking this as a parameter for the session
            max_round=10,
        )
        chat = GroupChatManager(
            groupchat=group,
        )
        agents["chat_manager"] = chat

    for message in session.messages:
        if message.sender == "UserProxy":
            proxy.send(str(message.content), chat, request_reply=False)
        else:
            sender = agents[message.sender]
            recipient = chat if message.sender == "chat_manager" else proxy
            sender.send(str(message.content), recipient, request_reply=False)

    for agent in agents.values():
        if isinstance(agent, RecordableAgent):
            agent.should_record = True

    return proxy, chat


@router.post("/{session_id}")
def send_message(session_id: str, message_content: str = Body(str), user=Depends(user_scope)) -> Session:
    summary = get_summary(session_id)
    user, recipient = initialize_chat(user, summary)

    user.send(message=message_content, recipient=recipient, request_reply=True)

    return summary
