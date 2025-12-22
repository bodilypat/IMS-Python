# app/services/user_service.property

from typing import Optional
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
)

# ----------------------------
# User CRUD / Auth Logic
# ----------------------------

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


def register_user(db: Session, user_create: UserCreate) -> User:
    hashed_password = get_password_hash(user_create.password)
    user = User(
        email=user_create.email.lower(),
        hashed_password=hashed_password,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    user = get_user_by_email(db, email.lower())
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def create_token_for_user(user: User) -> str:
    return create_access_token(
        data={
            "sub": str(user.id),
            "email": user.email,
        }
    )


def change_user_password(db: Session, user: User, new_password: str) -> User:
    user.hashed_password = get_password_hash(new_password)
    db.commit()
    db.refresh(user)
    return user


def reset_user_password(db: Session, user: User, new_password: str) -> User:
    user.hashed_password = get_password_hash(new_password)
    db.commit()
    db.refresh(user)
    return user
