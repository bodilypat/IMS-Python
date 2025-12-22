#app/api/endpoints/users.py

from fastapi import APIRouter, Depends, HTTPException, status 
from fastapi.sercurity import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, get_current_user
from app.models.user import User
from ap.schemas.user import UserCreate, UserRead
from app.schemas.token import Token
from app.services.user_service import (
    get_user_by_email,
    register_user,
    authenticate_user,
    create_token_for_user,
    change_user_password,
)

router = APIRouter(prefix="/users", tags=["users"])

#------------------------------------- 
# Register a new user
#-------------------------------------
@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(
    user_create: UserCreate,
    db: Session = Depends(get_db),
):
    existing_user = get_user_by_email(db, email=user_create.email.lower())
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    new_user = register_user(db, user_create)
    return new_user

#-------------------------------------
# Login / Token 
#-------------------------------------
@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = authenticate_user(db, email=form_data.username.lower(), password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_token_for_user(user)
    return token

#-------------------------------------
# get current user
#-------------------------------------
@router.get("/me", response_model=UserRead)
def get_current_user(
    current_user: User = Depends(get_current_user),
):
    return current_user

#-------------------------------------
# Change password
#-------------------------------------
@router.post("/change-password", status_code=status.HTTP_200_OK)
def change_password(
    new_password: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    change_user_password(db, user=current_user, new_password=new_password)
    return {"detail": "Password changed successfully"}

