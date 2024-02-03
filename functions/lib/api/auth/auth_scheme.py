from fastapi.security import HTTPBearer, HTTPBasic

bearer_scheme = HTTPBearer(
    scheme_name="Access Token",
    description="Authenticate with an access token"
)
basic_scheme = HTTPBasic(
    scheme_name="Email and password",
    description="Authenticate with your email as the username and password"
)
