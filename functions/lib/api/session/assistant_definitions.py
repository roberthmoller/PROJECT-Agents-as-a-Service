import datetime
import os


DEFAULT_LLM_CONFIG = {
    "cache_seed": 42,
    "temperature": 0,
    "config_list": [
        {"model": "gpt-3.5-turbo-125", "api_key": os.environ["OPENAI_API_KEY"]}
    ]
}
from abc import ABC
from datetime import datetime
from typing import Union, Dict, Optional

from autogen import AssistantAgent, UserProxyAgent, Agent, GroupChat, GroupChatManager, ConversableAgent
from dotenv import load_dotenv

from lib.api.agent.agent_model import SavedAgentSpecification
from lib.api.auth.auth_model import FirebaseUser
from lib.api.session.message_model import SavedMessageModel
from lib.api.session.session_model import Session
from lib.utils.firebase.admin import db


class FirebaseAgent(ConversableAgent, ABC):
    id: str
    display_name: str
    session: Session
    user: FirebaseUser
    should_record: bool = False

    def record_message(self, message: Union[Dict, str]):
        if isinstance(message, Dict) and ("tool_calls" in message or "function_call" in message):
            # Todo: In the future record the function call request to see it loading and see params in the ui
            return
        content = (str(message["content"]) if isinstance(message, Dict) else str(message)).strip()
        # Todo: Change this to the ID but how can we get the ID when the sender is not the current instance
        #  but instead the group chat manager?
        sender = str(message["name"]) if isinstance(message, Dict) else self.name
        if self.should_record and len(content) > 0:
            messages_collection = db().collection(
                f"v1/public/users/{self.user.uid}/sessions/{self.session.id}/messages")
            message_document = messages_collection.document()
            stripped_content = content \
                .rstrip("TERMINATE") \
                .rstrip("TERMINATE.") \
                .lstrip(f"{sender}:") \
                .lstrip(f"{self.name}:") \
                .lstrip(f"{self.display_name}:") \
                .strip()
            message_data = SavedMessageModel(
                id=message_document.id,
                content=stripped_content,
                sender=sender,
                sent_at=str(datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3])
            )
            message_document.set(message_data.to_message().model_dump())
            self.session.messages.append(message_data)

    def send(self, message: Union[Dict, str], recipient: Agent, request_reply: Optional[bool] = None,
             silent: Optional[bool] = False):
        self.record_message(message)
        return super().send(message, recipient, request_reply, silent)


class FirebaseUserProxyAgent(UserProxyAgent, FirebaseAgent):
    def __init__(self, session: Session, user: FirebaseUser):
        self.session = session
        self.id = user.uid
        self.user = user
        self.display_name = ((user.name or "User").replace(" ", "_"))
        super().__init__(
            name=self.id,
            human_input_mode="NEVER",
            # Todo: Take this as a parameter for the session
            llm_config=DEFAULT_LLM_CONFIG,
            code_execution_config={
                "work_dir": "work_dir",
                # Todo: Use docker for code execution in the future
                "use_docker": False
            },
            # todo: Consider taking this as a parameter for the session
            max_consecutive_auto_reply=10,
            is_termination_msg=lambda x: x.get("content", "").rstrip().endswith("TERMINATE"),
            default_auto_reply="...",
            system_message=f"""
            # User
            You are the user. You can ask questions and the agents will answer them.
            ## Rules
            - You can ask questions and the agents will answer them
            - You can execute functions registered by the admin
            - You can execute code blocks that have the "python" or "sh" language tag
            """
        )


class FirebaseAssistantAgent(AssistantAgent, FirebaseAgent):
    def __init__(self, session: Session, agent: SavedAgentSpecification, proxy: FirebaseUserProxyAgent):
        self.session = session
        self.specification = agent
        self.id = agent.id
        self.user = proxy.user
        self.display_name = agent.name
        super().__init__(
            llm_config={
                "cache_seed": agent.cache_seed,
                "temperature": agent.temperature,
                "config_list": [model.config() for model in agent.models]
            },
            name=agent.id,
            description=agent.system_message,
            system_message=f"""
            # {self.display_name}
            Your name is "{self.display_name}". Follow the system message to answer the user's question.
            ## Chat members
            {", ".join([member.name.replace("_", " ") for member in [proxy, *session.agents]])}
            ## System message
            {agent.system_message}.
            ## Rules
            - You can use any of the functions registered by the admin
            - You can write and execute code blocks that have the "python" or "sh" language tag
            - Reply 'TERMINATE' when you have answered the user
            - End your questions with 'TERMINATE'
            """,
            is_termination_msg=lambda x: x.get("content", "").rstrip().endswith("TERMINATE"),
        )


class CustomGroupChat(GroupChatManager):
    def __init__(self, proxy: FirebaseUserProxyAgent, agents: list[FirebaseAgent]):
        super().__init__(
            groupchat=GroupChat(
                agents=[proxy, *agents],
                messages=[],
                admin_name="Admin",
                speaker_selection_method="auto",
                max_round=proxy.max_consecutive_auto_reply()
            ),
            name="Admin",
            # Todo: Take this as a parameter for the session
            llm_config=DEFAULT_LLM_CONFIG,
            max_consecutive_auto_reply=10,
            description="Chat admin responsible for managing the chat and ensuring the user's questions are answered.",
            system_message=f"""
            # Admin
            You are the admin of the chat. Your role is to manage the chat and ensure that the user's questions are answered.
            ## Chat members
            {self.format_members(agents, proxy)}
            ## Rules
            - You are not allowed to answer the user's questions
            - You are not allowed to ask the user questions
            - Reply 'TERMINATE' when the user's questions are answered
            - If the user's questions are not answered, you can ask the agents to answer the user's questions
            """,
            is_termination_msg=lambda x: x.get("content", "").rstrip().endswith("TERMINATE"),
        )

    @staticmethod
    def format_members(agents: list[FirebaseAgent], user: FirebaseUserProxyAgent):
        return ", ".join([
            (user.name if user.name == "User" else f"{user.name} ({user.id})"),
            *(f"{agent.display_name} ({agent.id})" for agent in agents)
        ])
