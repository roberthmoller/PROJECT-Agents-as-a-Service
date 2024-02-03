from fastapi import FastAPI

from lib.api.agent.agent_router import router as agent_router
from lib.api.auth.auth_router import router as auth_router
from lib.api.session.session_router import router as session_router

app = FastAPI(
    title="Agents as a Service",
    description="API for the Agents as a Service project",
    version="0.0.1",
    docs_url="/",
    redoc_url="/redoc",
    swagger_ui_oauth2_redirect_url="/auth",
    swagger_ui_init_oauth={
        "appName": "Agents as a Service",
        "scopes": ["user", "admin"],
    }
)
app.include_router(auth_router)
app.include_router(agent_router)
app.include_router(session_router)

if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app)
