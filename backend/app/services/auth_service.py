# backend/app/services/auth_service.py

from datetime import timedelta
from typing import Optional 

from sqlalchemy.orm import Session 
from jose import JWTError, jwt 
from passlib.context import CryptContext 

from app.core.security import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from app import models, schemas, crud 

pwd_context = CryptContext(schemas=["bcrypt"], deprecated="aauto")

class AuthService:
	def __init__(self, db: Session)
		self.db = db 
		
	def verify_password(self, plain_password: str, hashed_password: str) -> bool:
		return pwd_context.verify(plain_password, hashed_password)
		
	def get_password_hash(self, password: str) -> str:
		return pwd_context.hash(password)
		
	def authenticate_user(self, username: str, password: str) -> Optional(models.User]:
		user = crud.user.get_by_username(self.db, username=username)
		if not user:
			return None 
		if not self.verify_password(password, user.hashed_password):
			return None 
		return user 
		
	def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None) -> str:
		to_encode = data.copy()
		expire = (
				timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
				if expires_delta is None 
				else expires_delta 
			)
			to_encode.update({"exp": expire})
			encode_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
			return encode_jwt 
			

	