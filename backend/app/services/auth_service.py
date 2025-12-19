#app/services/auth_service.py

from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password, verify_password, create_access_token
from fastapi import HTTPException, status

#--------------------------------
# Login, Register, Token logic 
#--------------------------------

def register_user(db: Session, user_create: UserCreate) -> User:
    existing_user = db.query(User).filter(User.email == user_create.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
    hashed_password = hash_password(user_create.password)
    db_user = User(email=user_create.email, hashed_password=hashed_password, full_name=user_create.full_name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str) -> User:
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return user

def create_token_for_user(user: User) -> str:
    token_data = {"sub": user.email, "user_id": user.id}
    token = create_access_token(data=token_data)
    return token

def change_user_password(db: Session, user_id: int, new_password: str) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    user.hashed_password = hash_password(new_password)
    db.commit()
    db.refresh(user)
    return user

def reset_user_password(db: Session, email: str, new_password: str) -> User:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    user.hashed_password = hash_password(new_password)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


