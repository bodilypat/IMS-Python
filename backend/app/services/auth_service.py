#app/services/auth_service.py

from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import verify_password, get_password_hash, create_access_token

#-----------------------------------
# Authentication & Authorization 
#-----------------------------------
def register_user(db: Session, user_create: UserCreate) -> User:
    existing_user = db.query(User).filter(User.email == user_create.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
    hashed_password = get_password_hash(user_create.password)
    new_user = User(email=user_create.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid credentials"
        )
    return user

#-----------------------------------
# Token Generation
#-----------------------------------
def create_token_for_user(user: User) -> str:
    token_data = {
        "user_id": user.id,
        "email": user.email
    }
    access_token = create_access_token(data={"sub": user.email})
    return access_token

#-----------------------------------
# Change Password
#-----------------------------------
def change_user_password(db: Session, user: User, new_password: str) -> User:
    user = db.query(User).filter(User.id == user.id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    hashed_password = get_password_hash(new_password)
    user.hashed_password = hashed_password
    db.commit()
    db.refresh(user)
    return user

#-----------------------------------
# Reset Password
#-----------------------------------
def reset_user_password(db: Session, email: str, new_password: str) -> User:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    hashed_password = get_password_hash(new_password)
    user.hashed_password = hashed_password
    db.commit()
    db.refresh(user)
    return user

#-----------------------------------
# get user by email
#-----------------------------------
def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


