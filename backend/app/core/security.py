#app/core/security.py

from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
import os

#----------------------------------
# Password hashing context
#----------------------------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#----------------------------------
# SECRET_KEY
#----------------------------------
SECRET_KEY = os.getenv("IMS_IN12P12")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

#--------------------------------
# Hash a plain password
#--------------------------------
def hash_password(plain_password: str) -> str:
    return pwd_context.hash(plain_password)

#--------------------------------------------------
# Verify a plain password against a hashed password
#
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

#--------------------------------
# Create a JWT access token
#--------------------------------
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, "your_secret_key", algorithm="HS256")
    return encoded_jwt

#--------------------------------
# Verify a JWT access token
#--------------------------------
def verify_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, "your_secret_key", algorithms=["HS256"])
        return payload
    except JWTError:
        raise ValueError("Invalid token")
    
    
#--------------------------------
# Login, Register, Token logic
#--------------------------------
