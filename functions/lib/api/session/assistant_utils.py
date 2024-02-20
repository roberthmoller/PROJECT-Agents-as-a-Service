from typing import Tuple, Dict

from autogen import Agent, AssistantAgent, UserProxyAgent, GroupChatManager
from autogen.agent_utils import gather_usage_summary
from autogen.agentchat import register_function

from lib.api.auth.auth_model import FirebaseUser
from lib.api.session.assistant_definitions import FirebaseUserProxyAgent, FirebaseAgent, FirebaseAssistantAgent, \
    CustomGroupChat
from lib.api.session.session_model import Session
from lib.api.skills.skill_router import get_skill
from lib.api.skills.skill_utils import extract_methods


def initialize_chat(
        user: FirebaseUser,
        session: Session
) -> Tuple[UserProxyAgent, AssistantAgent | GroupChatManager]:
    # Create the agents
    proxy = FirebaseUserProxyAgent(session, user)
    agents: dict[str, FirebaseAssistantAgent] = {
        agent.id: FirebaseAssistantAgent(session, agent, proxy)
        for agent in session.agents
    }
    # Determine what agent is the entrypoint
    if len(agents) == 1:
        chat = next(iter(agents.values()))
    else:
        chat = CustomGroupChat(proxy, list(agents.values()), )

    # Insert history into the chat
    for message in session.messages:
        if message.sender == user.uid:
            proxy.send(message.content, chat, request_reply=False)
        else:
            sender = agents[message.sender]
            sender.send(message.content, chat, request_reply=False)

    # Enable recording to the database
    for agent in agents.values():
        if isinstance(agent, FirebaseAgent):
            agent.should_record = True
    proxy.should_record = True

    # Register all skills
    for agent in agents.values():
        if isinstance(agent, FirebaseAssistantAgent):
            skill_specs = [get_skill(skill_id=skill_id, user=user) for skill_id in agent.specification.skills or []]
            skills = [(spec, extract_methods(spec.code)) for spec in skill_specs]
            for skill, methods in skills:
                safe_skill_name = skill.name.replace(" ", "_")
                for method_name, method in methods.items():
                    function_name = f"{safe_skill_name}_{method_name}"
                    method.__name__ = function_name
                    method.__doc__ = method.__doc__ or f"Skill called {function_name}"
                    register_function(
                        name=function_name,
                        description=method.__doc__,
                        caller=agent,
                        executor=proxy,
                        f=method,
                    )

    return proxy, chat


def get_usage(
        proxy: UserProxyAgent,
        chat: AssistantAgent | GroupChatManager
) -> Tuple[Dict[str, any], Dict[str, any]]:
    agents: list[Agent] = [proxy]
    if isinstance(chat, FirebaseAssistantAgent):
        agents.append(chat)
    elif isinstance(chat, CustomGroupChat):
        agents.append(chat)
        # Todo: This might not reference the correct list of agents. Since they are mutated maybe use the list inside
        #  the _groupchat variable
        agents.extend(chat._groupchat.agents)
    return gather_usage_summary(agents)

# datetime skill
# from datetime import datetime, timedelta
# from typing import Annotated
#
#
# def now() -> str:
#     """
#     Gets the current datetime
#     """
#     return str(datetime.now())
#
#
# def in_days(days: Annotated[int, "Number of days to increment"]) -> str:
#     """
#     Gets the current datetime plus 1 day
#     """
#     return str(now() + timedelta(days=days))
