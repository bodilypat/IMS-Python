#app/services/auth_service.py

from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import verify_password, create_access_token, hash_password
from app.service import audit_service
from datetime import datetime, timedelta

#--------------------------------------------
# Register User 
#--------------------------------------------
def register_user(db: Session, username: str, password: str, email: str, role: str = "staff") -> User:
    existing_user = db.query(User).filter(User.username == username).first()
    if existing_user:
        raise ValueError("Username already exists")
    user = User(
        username=username,
        password_hash=hash_password(password),
        email=email,
        role=role,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Audit log
    audit_service.log_action(db, user.id, "register", f"User {username} registered.")
    return user

#--------------------------------------------
# Login User
#--------------------------------------------
def login_user(db: Session, username: str, password: str) -> str:
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.password_hash):
        raise ValueError("Invalid username or password")
    
    access_token_expires = timedelta(minutes=60)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    # Audit log
    audit_service.log_action(db, user.id, "login", f"User {username} logged in.")
    return access_token

#--------------------------------------------
# Change Password
#--------------------------------------------
def change_password(db: Session, user_id: int, old_password: str, new_password: str) -> None:
    user = db.query(User).filter(User.id == user_id).first()
    if not user or not verify_password(old_password, user.password_hash):
        raise ValueError("Old password is incorrect")
    
    user.password_hash = hash_password(new_password)
    db.commit()

    # Audit log
    audit_service.log_action(db, user.id, "change_password", f"User {user.username} changed password.")

#--------------------------------------------
# Generate Token (for password reset)
#--------------------------------------------
def generate_reset_token(db: Session, email: str) -> str:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise ValueError("Email not found")
    
    reset_token = create_access_token(
        data={"sub": user.username}, expires_delta=timedelta(minutes=30)
    )

    # Audit log
    audit_service.log_action(db, user.id, "generate_reset_token", f"User {user.username} requested password reset token.")
    return reset_token

#--------------------------------------------
# Reset Password
#--------------------------------------------
def reset_password(db: Session, token: str, new_password: str) -> None:
    from app.core.security import decode_access_token
    payload = decode_access_token(token)
    username = payload.get("sub")
    if not username:
        raise ValueError("Invalid token")
    
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise ValueError("User not found")
    
    user.password_hash = hash_password(new_password)
    db.commit()

    # Audit log
    audit_service.log_action(db, user.id, "reset_password", f"User {user.username} reset password.")

#--------------------------------------------
# Full Login Flow 
#--------------------------------------------
def full_login_flow(db: Session, username: str, password: str) -> str:
    try:
        token = login_user(db, username, password)
        return token
    except ValueError as e:
        raise ValueError(f"Login failed: {str(e)}")
    
#--------------------------------------------
# Full Registration Flow
#--------------------------------------------
def full_registration_flow(db: Session, username: str, password: str, email: str, role: str = "staff") -> User:
    try:
        user = register_user(db, username, password, email, role)
        return user
    except ValueError as e:
        raise ValueError(f"Registration failed: {str(e)}")
    

