import os
from abc import abstractmethod
from enum import Enum

from pydantic import model_serializer


class LlmModel(str, Enum):
    @abstractmethod
    def config(self) -> str:
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

    def config(self):
        return {"model": self.value, "api_key": os.environ["OPENAI_API_KEY"]}


class LocalLlmModel(LlmModel):
    mixtral = "mixtral"
    orca_mini = "orca-mini"

    def config(self):
        return {"model": self, "api_key": "ollama", "base_url": "http://localhost:11434/v1"}
