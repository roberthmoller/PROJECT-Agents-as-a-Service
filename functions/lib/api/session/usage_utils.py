from datetime import datetime
from autogen.agentchat import Agent, gather_usage_summary
from firebase_admin.firestore import firestore as Firestore
from pydantic import BaseModel, Field
from typing import Tuple, Dict

from lib.api.auth.auth_model import FirebaseUser
from lib.utils.firebase.admin import db
from lib.utils.now import date_to_str, now


class ModelPricing(BaseModel):
    input_price: float
    output_price: float
    token_count: int


llm_pricing_table = {
    # GPT4 turbo
    'gpt-4-0125-preview': ModelPricing(input_price=10, output_price=30, token_count=1_000_000),
    'gpt-4-1106-preview': ModelPricing(input_price=10, output_price=30, token_count=1_000_000),
    'gpt-4-1106-vision-preview': ModelPricing(input_price=10, output_price=30, token_count=1_000_000),
    # GPT4
    'gpt-4': ModelPricing(input_price=30, output_price=60, token_count=1_000_000),
    'gpt-4-32k': ModelPricing(input_price=60, output_price=120, token_count=1_000_000),
    # GPT3.5
    'gpt-3.5-turbo-0125': ModelPricing(input_price=0.5, output_price=1.5, token_count=1_000_000),
    'gpt-3.5-turbo-instruct': ModelPricing(input_price=1.5, output_price=2, token_count=1_000_000),
    # Older models
    'gpt-3.5-turbo-1106': ModelPricing(input_price=1.0, output_price=2, token_count=1_000_000),
    'gpt-3.5-turbo-0613': ModelPricing(input_price=1.5, output_price=2, token_count=1_000_000),
    'gpt-3.5-turbo-16k-0613': ModelPricing(input_price=3.0, output_price=4, token_count=1_000_000),
    'gpt-3.5-turbo-0301': ModelPricing(input_price=1.5, output_price=2, token_count=1_000_000),
    # Groq
    'llama2-70b-4096': ModelPricing(input_price=0.7, output_price=0.8, token_count=1_000_000),
    'mixtral-8x7b-32768': ModelPricing(input_price=0.27, output_price=0.27, token_count=1_000_000),

}


class ModelUsage(BaseModel):
    cost: float
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int


class ModelsUsage(BaseModel):
    cost: float
    models: Dict[str, ModelUsage]


class FunctionUsage(BaseModel):
    cost: float
    time_spent: str


class DatabaseUsage(BaseModel):
    cost: float
    records_written: int


class UsageModel(BaseModel):
    created_at: str = Field(factory=now)
    total_cost: float
    models: ModelsUsage
    function: FunctionUsage
    database: DatabaseUsage


class SavedUsageModel(UsageModel):
    id: str


def calculate_model_usage(summary: Tuple[Dict[str, any], Dict[str, any]]) -> ModelsUsage:
    actual_usage_summary = summary[0]
    del actual_usage_summary['total_cost']
    cost = 0
    models = {}
    for model_name, model_usage in actual_usage_summary.items():
        pricing = llm_pricing_table[model_name]
        price_per_prompt_token = pricing.input_price / pricing.token_count
        price_per_completion_token = pricing.output_price / pricing.token_count

        prompt_tokens = model_usage['prompt_tokens']
        completion_tokens = model_usage['completion_tokens']

        model_cost = (prompt_tokens * price_per_prompt_token) + (completion_tokens * price_per_completion_token)

        cost += model_cost
        models[model_name] = ModelUsage(
            cost=model_cost,
            prompt_tokens=model_usage['prompt_tokens'],
            completion_tokens=model_usage['completion_tokens'],
            total_tokens=model_usage['total_tokens']
        )
    return ModelsUsage(cost=cost, models=models)


def calculate_function_usage(start_time: datetime, end_time: datetime) -> FunctionUsage:
    cost_per_invocation = 0.40 / 1_000_000  # dollars $ / million invocations
    cost_per_networking = 0  # TODO: Find a way to calculate networking cost
    cost_per_cpu_seconds = 0.0000100
    cost_per_gb_seconds = 0.0000025
    seconds_spent = (end_time - start_time).seconds
    cost = cost_per_invocation + cost_per_networking + (seconds_spent * (cost_per_cpu_seconds + cost_per_gb_seconds))
    return FunctionUsage(cost=cost, time_spent=seconds_spent)


def calculate_database_usage(session_id: str, start_time: datetime, end_time: datetime) -> DatabaseUsage:
    cost_of_writes = 0.0345 / 100_000  # dollars $ / 100,000 writes
    # TODO: convert times to strings
    records_written = db().collection(f"v1/public/sessions/{session_id}/messages") \
        .where(filter=Firestore.FieldFilter('sent_at', '>', date_to_str(start_time))) \
        .where(filter=Firestore.FieldFilter('sent_at', '<', date_to_str(end_time))) \
        .count()
    cost = records_written * cost_of_writes
    return DatabaseUsage(cost=cost, records_written=records_written)


def calculate_and_record_usage(
        user: FirebaseUser,
        session_id: str,
        agents: list[Agent],
        start_time: datetime,
        end_time: datetime
) -> UsageModel:
    # Calculate model usage
    model_usage_summary = gather_usage_summary(agents)
    model_usage = calculate_model_usage(model_usage_summary)
    # Calculate function usage
    function_usage = calculate_function_usage(start_time, end_time)
    # Calculate database usage
    # database_usage = calculate_database_usage(session_id, start_time, end_time)
    database_usage = DatabaseUsage(cost=0, records_written=0)
    # Calculate total cost
    usage = UsageModel(
        created_at=now(),
        total_cost=model_usage.cost + function_usage.cost + database_usage.cost,
        models=model_usage,
        function=function_usage,
        database=database_usage
    )
    usage_doc = db().collection(f"v1/public/users/{user.uid}/usage").document()
    usage_doc.set(usage.model_dump())
    return usage
