import os

from fastapi import FastAPI

from lib.api.agent.agent_router import router as agent_router
from lib.api.auth.auth_router import router as auth_router
from lib.api.session.session_router import router as session_router
from lib.utils.env import env

app = FastAPI(
    title="Agents as a Service",
    description="API for the Agents as a Service project",
    version="0.0.1",
    root_path="/api",
    redoc_url="/redoc",
    docs_url="/docs",
    openapi_url="/openapi.json",
    swagger_ui_parameters={
        "persistAuthorization": True,
    },
    root_path_in_servers=False,
    servers=[
        {"url": "http://localhost:5002/api", "description": "Local hosting proxy server"} if env.is_local
        else {"url": "http://agents-as-a-service.web.app/api", "description": "Production server"},
    ]
)
app.include_router(auth_router)
app.include_router(agent_router)
app.include_router(session_router)

if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app)
