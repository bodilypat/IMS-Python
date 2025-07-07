# backend/app/services/auth_service.py

from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestFrom
from sqlalchemy.orm import Session

from app import models, schemas, core 
from app.core.security import verify_password, create_access_token
from app.card import user as crud_user 
from app.core.config import setting 

def authenticate_user(db: Session, username: str, password: str):
	user = crud_user_get_by_username(db, username=username)
	if not user or not verify_password(password, user.hashed_password):
		return None
	return user 
	
def login_user(db: Session, from_date: OAuth2PasswordRequestForm):
	user = authenticate_user(db, from_data.username, form_data.password)
	if not user:
		return None 
		
	access_Token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
	access_token = create_access_token(
		data= {"sub": user.username}, expires_delta=access_token_expires
	)
	return(
		"access_token": access_token,
		"token_type": "bearer"
	}
	
