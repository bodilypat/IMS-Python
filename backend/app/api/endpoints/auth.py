#app/api/emdpoints/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, get_current_user
from app.schemas.user import UserCreate, UserRead, changePassword
from app.schemas.token import Token
from app.services.auth_service import (
    register_user,
    authenticate_user,
    create_token_for_user,
    change_user_password,
)
router = APIRouter(prefix="/auth", tags=["auth"])

#--------------------------------------------
# Register 
#--------------------------------------------
@router.post(
    "/register", 
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)

def register(
    user_create: UserCreate, 
    db: Session = Depends(get_db)
):
    user = register_user(db, user_create)
    return user

#--------------------------------------------
# Login
#--------------------------------------------
@router.post(
    "/login", 
    response_model=Token
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), 
    db: Session = Depends(get_db)
):
    user = authenticate_user(
        db, 
        email=form_data.username, 
        password=form_data.password
    )
    access_token = create_token_for_user(user)
    return {
        "access_token": access_token, 
        "token_type": "bearer"
    }

#--------------------------------------------
# Get current user
#--------------------------------------------
@router.get(
    "/me", 
    response_model=UserResponse
)
def get_current_user_info(
    current_user: UserResponse = Depends(get_current_user)
):
    return current_user

#--------------------------------------------
# Change password
#--------------------------------------------
@router.post(
    "/change-password", 
    response_model=UserResponse
)
def change_password(
    password_data: changePassword,
    current_user: UserResponse = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = change_user_password(
        db, 
        user_id=current_user.id, 
        old_password=password_data.old_password, 
        new_password=password_data.new_password
    )
    return user

