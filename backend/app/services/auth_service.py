#app/services/auth_service.py

from datetime import timedelta
from sqlalchemy.orm import Session
from typing import Optional

from app.models.user import User
from app.core.security import (
    verify_password, 
    create_access_token,
    decode_access_token,
    hash_password,
)
from app.services import audit_service 

#-------------------------------------
# Register User 
#-------------------------------------
def register_user(
    db: Session, 
    username: str, 
    password: str, 
    email: str, 
    user_role: str,
) -> User:
    existing_user = db.query(User).filter(User.username == username).first()
    if existing_user:
        raise ValueError("Username already exists")
    
    hashed_password = hash_password(password)
    new_user = User(
        username=username,
        hashed_password=hashed_password,
        email=email,
        role=user_role,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    audit_service.log_event(
        db=db,
        event_type="user_registration",
        description=f"New user registered: {username}",
    )

    return new_user

#-------------------------------------
# Login User
#-------------------------------------
def login_user(
    db: Session, 
    username: str, 
    password: str,
    expires_delta: Optional[timedelta] = None,
) -> str:
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        raise ValueError("Invalid username or password")
    
    access_token = create_access_token(
        data={"sub": user.username, "role": user.role},
        expires_delta=expires_delta,
    )

    audit_service.log_event(
        db=db,
        event_type="user_login",
        description=f"User logged in: {username}",
    )

    return access_token

#-------------------------------------
# Change Password
#-------------------------------------
def change_password(
    db: Session, 
    username: str, 
    old_password: str, 
    new_password: str,
) -> None:
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(old_password, user.hashed_password):
        raise ValueError("Invalid username or password")
    
    user.hashed_password = hash_password(new_password)
    db.commit()

    audit_service.log_event(
        db=db,
        event_type="password_change",
        description=f"User changed password: {username}",
    )
    return None

#-------------------------------------
# Generate Reset Token 
#-------------------------------------
def generate_reset_token(
    db: Session, 
    username: str,
    expires_delta: Optional[timedelta] = None,
) -> str:
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise ValueError("User not found")
    
    reset_token = create_access_token(
        data={"sub": user.username},
        expires_delta=expires_delta,
    )

    audit_service.log_event(
        db=db,
        event_type="reset_token_generated",
        description=f"Password reset token generated for user: {username}",
    )

    return reset_token

#-------------------------------------
# Reset Password
#-------------------------------------
def reset_password(
    db: Session, 
    reset_token: str, 
    new_password: str,
) -> None:
    payload = decode_access_token(reset_token)
    username: str = payload.get("sub")
    if username is None:
        raise ValueError("Invalid reset token")
    
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise ValueError("User not found")
    
    user.hashed_password = hash_password(new_password)
    db.commit()

    audit_service.log_event(
        db=db,
        event_type="password_reset",
        description=f"User reset password: {username}",
    )
    return None

#-------------------------------------
# Full login flow(with unified error handling)
#-------------------------------------
def full_login_flow(
    db: Session, 
    username: str, 
    password: str,
    expires_delta: Optional[timedelta] = None,
) -> str:
    try:
        token = login_user(db, username, password, expires_delta)
        return token
    except ValueError as e:
        # Log the error or handle it as needed
        raise e
    
#-------------------------------------
# Full Register flow(with unified error handling)
#-------------------------------------
def full_register_flow(
    db: Session, 
    username: str, 
    password: str, 
    email: str, 
    user_role: str,
) -> User:
    try:
        user = register_user(db, username, password, email, user_role)
        return user
    except ValueError as e:
        raise ValueError("Registration failed: " + str(e))


    
