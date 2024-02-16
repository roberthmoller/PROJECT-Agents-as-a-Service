import os
from enum import Enum

from dotenv import load_dotenv

load_dotenv(".env")
load_dotenv(".env.default")
load_dotenv(".env.local")


class ENV(Enum):
    LOCAL = "LOCAL"
    PROD = "PROD"

    @property
    def is_production(self):
        return self == ENV.PROD

    @property
    def is_local(self):
        return self == ENV.LOCAL

    @property
    def openai_api_key(self):
        return os.environ["OPENAI_API_KEY"]

    @staticmethod
    def of(value: str):
        if value == "LOCAL":
            return ENV.LOCAL
        elif value == "PROD":
            return ENV.PROD
        else:
            raise ValueError(f"Invalid environment: {value}")


env = ENV.of(os.environ["ENV"])
