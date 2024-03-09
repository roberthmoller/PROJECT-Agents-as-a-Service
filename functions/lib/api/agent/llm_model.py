import os
from abc import abstractmethod
from enum import Enum

from pydantic import model_serializer


class LlmModel(str, Enum):
    @property
    def can_call_skills(self):
        return False

    @abstractmethod
    def config(self) -> dict[str, str]:
        ...

    @model_serializer
    def serialize(self):
        return self.value

    def __repr__(self):
        return self.value


class OpenAILlmModel(LlmModel):
    gpt_4_0125_preview = "gpt-4-0125-preview"  # new
    gpt_4_turbo_preview = "gpt-4-turbo-preview"
    gpt_4_1106_preview = "gpt-4-1106-preview"
    gpt_4 = "gpt-4"
    gpt_4_0613 = "gpt-4-0613"
    gpt_4_32k = "gpt-4-32k"
    gpt_4_32k_0613 = "gpt-4-32k-0613"

    gpt_3_5_turbo_0125 = "gpt-3.5-turbo-0125"  # new
    gpt_3_5_turbo = "gpt-3.5-turbo"
    gpt_3_5_turbo_1106 = "gpt-3.5-turbo-1106"
    gpt_3_5_turbo_instruct = "gpt-3.5-turbo-instruct"

    @property
    def can_call_skills(self):
        return True

    def config(self):
        return {"model": self.value, "api_key": os.environ["OPENAI_API_KEY"]}


class GroqLlmModel(LlmModel):
    mixtral_8x7b_32768 = "mixtral-8x7b-32768"
    llama2_70b_4096 = "llama2-70b-4096"

    def config(self) -> dict[str, str]:
        return {"model": self.value, "api_key": os.environ["GROQ_API_KEY"],
                "base_url": "https://api.groq.com/openai/v1"}


class GemeniLlmModel(LlmModel):
    gemini_pro_vision = "gemini-pro-vision"
    gemini_pro = "gemini-pro"

    def config(self) -> dict[str, str]:
        return {"model": self.value, "api_key": os.environ["GEMENI_API_KEY"], "api_type": "google"}


class AnthropicLlmModel(LlmModel):
    claude_3_opus_20240229 = "claude-3-opus-20240229"
    claude_3_sonnet_20240229 = "claude-3-sonnet-20240229"
    claude_2_1 = "claude-2.1"
    claude_2_0 = "claude-2.0"
    claude_instant_1_2 = "claude-instant-1.2"

    def config(self) -> dict[str, str]:
        return {"model": self.value, "api_key": os.environ["ANTHROPIC_API_KEY"],
                "base_url": "https://api.anthropic.com/v1"}


class HuggingFaceLlmModel(LlmModel):
    gemma_7b = "gemma-7b"
    mistral_7B_instruct_v0_2 = "Mistral-7B-Instruct-v0.2"

    def config(self) -> dict[str, str]:
        endpoint = "vlzz10eq3fol3429.us-east-1.aws"  # get this from user env variables
        return {"model": self.value, "api_key": os.environ["HUGGING_FACE_API_KEY"],
                "base_url": f"https://{endpoint}.endpoints.huggingface.cloud/v1/"}


class LocalLlmModel(LlmModel):
    mixtral = "mixtral"
    orca_mini = "orca-mini"

    def config(self):
        return {"model": self, "api_key": "ollama", "base_url": "http://localhost:11434/v1"}
