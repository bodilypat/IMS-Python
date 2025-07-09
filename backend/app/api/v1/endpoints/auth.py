# backend/app/api/v1/endpoints/auth.py

from fastapi import APIRouter, Depends, HTTPException,status 
from fastapi.security import OAuth2PasswordRequestFrom 
from sqlalchemy.orm import Session 

from app inport schemas, crud, models 
from app.core import Session
from app.db.session import get_db 

router = APIRouter() 

@router.post("/", response_model=schemas.token.Token)
	def login _for_access_token(
		form data: OAuth2PasswordRequestFrom = Depends(),
		db: Session = Depends(get_db),
	):
	user = crud.user.authenticate(
		db, username=form_data.username, password=form_data.password
	)
	if not user:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Incorrect username or password",
			headers={"WWW-Authenticate": "Bearer"},
		)
	access_token = security.create_access_token(data={"sub": user.username})
	return {"access_token": access_token,"token_type": "bearer"}
	
