#app/services/user_service.py

from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import hash_password, verify_password
from app.services import audit_service

#---------------------------------------
# Crete User 
#--------------------------------------
def create_user(db: Session, username: str, password: str, email: str) -> User:
    existing = db.query(User).filter(User.username == username).first()
    if existing:
        raise ValueError("Username already exists")
    user = User(
        username=username,
        password=hash_password(password),
        email=email
        role=role
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # audit log
    audit_service.log_action(db, f"User created: {username}")

    return user

#---------------------------------------
# Get User by ID
#---------------------------------------
def get_user_by_id(db: Session, user_id: int) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError("User not found")
    return user
#---------------------------------------
# List users
#--------------------------------------
def list_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()

#---------------------------------------
# Update User
#---------------------------------------
def update_user(db: Session, user_id: int, **kwargs) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError("User not found")
    
    # Prevent username duplication
    if "username" in kwargs:
        existing = db.query(User).filter(User.username == kwargs["username"], User.id != user_id).first()
        if existing:
            raise ValueError("Username already exists")
        
    for key, value in kwargs.items():
        if key == "password":
            value = hash_password(value)
        setattr(user, key, value)
    db.commit()
    db.refresh(user)
    # audit log
    audit_service.log_action(db, f"User updated: {user.username}")
    return user

