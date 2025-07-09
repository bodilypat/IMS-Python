# backend/app/schemas/token.py

from typeing import Optional
from pydantic import BaseModel

class Token(BaseModel)
	access_token: str
	token_type: str 
	
class TokenData(BaseModel)
	username: Optional[str] = None
    