from typing import Tuple, Dict, Callable, List

from autogen import Agent, AssistantAgent, UserProxyAgent, GroupChatManager
from autogen.agentchat import register_function

from lib.api.auth.auth_model import FirebaseUser
from lib.api.session.assistant_definitions import FirebaseUserProxyAgent, FirebaseAgent, FirebaseAssistantAgent, \
    CustomGroupChat
from lib.api.session.session_model import Session
from lib.api.skills.skill_router import get_skill
from lib.api.skills.skill_utils import extract_methods, imports_from_code, import_dependencies


def initialize_chat(
        user: FirebaseUser,
        session: Session
) -> Tuple[UserProxyAgent, AssistantAgent | GroupChatManager, List[AssistantAgent]]:
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
        if isinstance(agent, FirebaseAssistantAgent) and agent.specification.can_call_skills:
            skill_specs = [get_skill(skill_id=skill_id, user=user) for skill_id in agent.specification.skills or []]
            for skill in skill_specs:
                methods = extract_methods(skill.code)
                imports = imports_from_code(skill.code)
                safe_skill_name = skill.name.replace(" ", "_")
                for method_name, function in methods.items():
                    function_name = f"{safe_skill_name}_{method_name}"
                    function.__name__ = function_name
                    function.__doc__ = function.__doc__ or f"Skill called {function_name}"
                    # TODO: Try to move this into the actual function call so that we only import the dependencies that
                    #  are needed for the functions that are called
                    import_dependencies(imports)
                    register_function(
                        name=function_name,
                        description=function.__doc__,
                        caller=agent,
                        executor=proxy,
                        f=function,
                        # f=import_and_run(imports, function),
                    )
    return proxy, chat, list(agents.values())


# def get_usage(
#         proxy: UserProxyAgent,
#         chat: AssistantAgent | GroupChatManager
# ) -> Tuple[Dict[str, any], Dict[str, any]]:
#     agents: list[Agent] = [proxy]
#     if isinstance(chat, FirebaseAssistantAgent):
#         agents.append(chat)
#     elif isinstance(chat, CustomGroupChat):
#         agents.append(chat)
#         # Todo: This might not reference the correct list of agents. Since they are mutated maybe use the list inside
#         #  the _groupchat variable
#         agents.extend(chat._groupchat.agents)
#     return gather_usage_summary(agents)

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


## YFinance skill
# import yfinance as yf
#
#
# def get_stock_info(company_name: str) -> dict:
#     stock = yf.Ticker(company_name)
#     return stock.info

# from  lib.utils.env import ENV
#
# def print_secret():
#     return str(ENV.openai_api_key)