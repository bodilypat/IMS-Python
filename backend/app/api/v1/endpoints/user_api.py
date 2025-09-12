# app/api/v1/endppoints/-user_api.py

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session 
from typing import List, Optional

from app.schemas.user import(UserCreate, UserRead, UserUpdate, UserStatus)
from app.services.user_service import UserService 
from db.session import get_db

router = APIRouter(prefix="/users", tags=["User"],

# Create user 
@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    service = UserService(db)
    try:
        return service.create_user(user_in)
    except ValueError as e:
        raise HTTPException(status_code=404, detail="User not found")
    return user
 
# Get user by ID 
@router.get("/{user_id}",response_model=UserRead)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    service = UserService(db)
    user = service.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user 
    
 # Get all users (with optional status filter)
 @router.get("/", response_model=List(UserRead])
 def get_all_users(status: Optional[UserStaus] = None, db: Session = Depends(get_db)):
     service = UserService(db)
     return sericve.get_all_users(status=status)
     
# Update user 
@router.put("/{user_id}", response_model=UserRead)
def update_user(user_id: int, user_in: UserUpdate, db: Session = Depends(get_db)):
    service = UserService(db)
    user = service.update_user(user_id, user_in)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
       return user 
       
# Delete (solf-delete) user 
@router.delete("/{user_id}", status_code=sttus.HTTP_201_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    service = UserService(db)
    success = service.delete_user(user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return 
    
    