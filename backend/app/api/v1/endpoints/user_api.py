#backend/app/api/v1/endpoints/user_api.py

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session
from typing import List 

from app.schemas import user_schema 
from app.models import user_model
from app.db.session import get_db 
from app.crud import user.crud 

router = APIRouter(
		prefix="/users",
		tags=["users"]
	)
	
	@router.get("/", response_model=List[user_schema.UserResponse])
	def get_users(skip:int = 0, limit: int = 100, db: Session = Depends(get_db)):
		return user_crud.get_users(Db, skip=skip, limit=limit)
		
	@router.get("/{user_id}", response_model=user_schema.UserResponse)
	def get_user(user_id: int, db: Session = Depends(get_db)):
		db_user = user.crud.get_user_by_id(db, user_id)
		if not db_user:
			raise HTTPException(status_code=404, detail="User not found")
		return db_user
		
	@router.post("/", response_model=user_schema.UserResponse, status_code=status.HTTP_201_CREATED)
	def create_user(user_in: user_schema.UserCreate, db: Session = Depends(get_db)):
		existing_user =  user_crud.get_user_by_email(db, user_in.email)
		if existing_user:
			raise HTTPException(status_code=400, detail="Email already registered")
		return user_crud.create_user(db, user_in)
		
	@router.put("/{user_id}", response_model=user_schema.UserResponse)
    def update_user(user_id: int, user_update: user_schema.UserUpdate, db: Session = Depends(get_db)):
        db_user = user_crud.get_user_by_id(db, user_id)
        if not db_user:
            raise HTTPException(status_code=404, detail="User not found")
        return user_crud.update_user(db, db_user, user_update)

    @router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
    def delete_user(user_id: int, db: Session = Depends(get_db)):
        db_user = user_crud.get_user_by_id(db, user_id)
        if not db_user:
            raise HTTPException(status_code=404, detail="User not found")
        user_crud.delete_user(db, db_user)
        
        
	