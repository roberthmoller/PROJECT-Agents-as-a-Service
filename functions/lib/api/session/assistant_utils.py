from typing import Tuple, Union

from autogen import ConversableAgent

from lib.api.auth.auth_model import FirebaseUser
from lib.api.session.assistant_definitions import FirebaseUserProxyAgent, FirebaseAgent, FirebaseAssistantAgent, \
    CustomGroupChat
from lib.api.session.session_model import Session


def initialize_chat(user: FirebaseUser, session: Session) \
        -> Tuple[FirebaseUserProxyAgent, FirebaseAgent | CustomGroupChat]:
    proxy = FirebaseUserProxyAgent(session, user)
    agents: dict[str, Union[FirebaseAgent]] = {
        agent.id: FirebaseAssistantAgent(session, agent, proxy)
        for agent in session.agents
    }
    if len(agents) == 1:
        chat = next(iter(agents.values()))
    else:
        chat = CustomGroupChat(proxy, list(agents.values()), )

    for message in session.messages:
        if message.sender == user.uid:
            proxy.send(message.content, chat, request_reply=False)
        else:
            sender = agents[message.sender]
            sender.send(message.content, chat, request_reply=False)

    for agent in agents.values():
        if isinstance(agent, FirebaseAgent):
            agent.should_record = True
    proxy.should_record = True
    return proxy, chat
