from fastapi.security import HTTPBearer, HTTPBasic, APIKeyHeader, HTTPAuthorizationCredentials
from fastapi import Depends, HTTPException

access_token_scheme = HTTPBearer(
    description="Authenticate with an access token",
    auto_error=False
)

username_password_scheme = HTTPBasic(
    description="Authenticate with your email as the username and password",
    auto_error=False
)

def api_key_scheme(
        api_key: str = Depends(APIKeyHeader(name='X-API-Key', auto_error=False))
) -> HTTPAuthorizationCredentials:
    if not api_key:
        return None
    return HTTPAuthorizationCredentials(scheme="Bearer", credentials=api_key)
