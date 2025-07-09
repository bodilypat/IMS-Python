# backend/app/core/security.py

from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext 

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 

pwd_context = CryptContext(schemas=["bcrypt", deprecated="auto")

def varify_password(plain, hashed):
	return pwd_context.verify(plain, hashed

def get_password_hash(password):
	return pwd_context.hash(password)
	
def create_access_token(data: dict, expires_timedelta: timedalta | None = None ):
	to_encode = data.copy()
	expire = datetime.utcnow() + (expire_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
	to_encode.update("exp": expire})
	return jwt.endcode(to_encode, SECRET_KEY, algorithm=ALGORITHM) 
