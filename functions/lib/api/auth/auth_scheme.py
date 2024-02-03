from fastapi.security import HTTPBearer, HTTPBasic

bearer_scheme = HTTPBearer(
    scheme_name="AccessToken",
    description="Authenticate with an access token"
)

basic_scheme = HTTPBasic(
    scheme_name="Email & Password",
    description="Authenticate with your email as the username and password"
)
