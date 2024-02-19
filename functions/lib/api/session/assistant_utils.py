from typing import Tuple

from lib.api.auth.auth_model import FirebaseUser
from lib.api.session.assistant_definitions import FirebaseUserProxyAgent, FirebaseAgent, FirebaseAssistantAgent, \
    CustomGroupChat
from lib.api.session.session_model import Session
from lib.api.skills.skill_router import get_skill
from lib.api.skills.skill_utils import extract_methods
from autogen.agentchat import register_function


def initialize_chat(
        user: FirebaseUser,
        session: Session
) -> Tuple[FirebaseUserProxyAgent, FirebaseAgent | CustomGroupChat]:
    proxy = FirebaseUserProxyAgent(session, user)
    agents: dict[str, FirebaseAgent] = {
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

    # Register all skills
    for agent in agents.values():
        if isinstance(agent, FirebaseAssistantAgent):
            # Get the skill from the database
            skill_specs = [get_skill(skill_id=skill_id, user=user) for skill_id in agent.specification.skills or []]
            skills = [(spec, extract_methods(spec.code)) for spec in skill_specs]
            for skill, methods in skills:
                safe_skill_name = skill.name.replace(" ", "_")
                for method_name, method in methods.items():
                    # Register the skill with the agent
                    function_name = f"{safe_skill_name}_{method_name}"
                    method.__name__ = function_name
                    register_function(
                        f=method,
                        caller=agent,
                        executor=proxy,
                        description=method.__doc__ or f"Skill called {safe_skill_name}"
                    )

    return proxy, chat


# datetime skill
# from datetime import datetime, timedelta
# from typing import Annotated
#
#
# def now() -> datetime:
#     """
#     Gets the current datetime
#     """
#     return datetime.now()
#
#
# def in_days(days: Annotated[int, "Number of days to increment"]) -> datetime:
#     """
#     Gets the current datetime plus 1 day
#     """
#     return now() + timedelta(days=days)
