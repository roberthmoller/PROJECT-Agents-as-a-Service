from fastapi.security import HTTPBearer, HTTPBasic

bearer_scheme = HTTPBearer(
    description="Authenticate with an access token"
)

basic_scheme = HTTPBasic(
    description="Authenticate with your email as the username and password"
)
