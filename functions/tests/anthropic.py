from dotenv import load_dotenv
from autogen import AssistantAgent, UserProxyAgent

from lib.api.agent.llm_model import GroqLlmModel, GemeniLlmModel, AnthropicLlmModel, HuggingFaceLlmModel

load_dotenv()

# Create an instance of the AssistantAgent
assistant = AssistantAgent(
    name="Assistant",
    llm_config=AnthropicLlmModel.claude_3_sonnet_20240229.config(),
)
# create a UserProxyAgent instance named "user_proxy"
user_proxy = UserProxyAgent(
    name="user_proxy",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=10,
    is_termination_msg=lambda x: x.get("content", "").rstrip().endswith("TERMINATE"),
    code_execution_config={
        "work_dir": "coding",
        "use_docker": False,
    },
)

if __name__ == '__main__':
    # the assistant receives a message from the user_proxy, which contains the task description
    user_proxy.initiate_chat(
        assistant,
        message="""What is 10*20?""",
    )