from fastapi import FastAPI

from lib.api.agent.agent_router import AgentRouter
from lib.api.auth.auth_router import router as auth_router
from lib.utils.database import create_tables

create_tables()
app = FastAPI()
app.include_router(AgentRouter().router)
app.include_router(auth_router)


