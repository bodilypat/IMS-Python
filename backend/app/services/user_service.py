#app/services/user_service.py

from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import hash_password, verify_password, generate_jwt_token

from app.services import audit_service

#----------------------------------------
# Create User 
#----------------------------------------
def create_user(db: Session, username: str, password: str, email: str, role: str = "Staff") -> User:
    existing_user = db.query(User).filter(User.username == username).first()
    if existing_user:
        raise ValueError("Username already exists")
    user = User(
        username=username,
        password=hash_password(password),
        email=email,
        role=role
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Audit log 
    audit_service.log_action(db, user_id=user.id, action="create_user", details=f"User {username} created.")

    return user

#----------------------------------------
# Get User by ID
#----------------------------------------
def get_user_by_id(db: Session, user_id: int) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError("User not found")
    
    return user

#----------------------------------------
# List Users 
#----------------------------------------
def list_users(db: Session, skip: int = 0, limit: int = 100):
    users = db.query(User).offset(skip).limit(limit).all()
    return users

#----------------------------------------
# Update User
#----------------------------------------
def update_user(db: Session, user_id: int, **kwargs) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError("User not found")
    
    # Prevent usrename duplication
    if "username" in kwargs:
        existing_user = db.query(User).filter(User.username == kwargs["username"], User.id != user_id).first()
        if existing_user:
            raise ValueError("Username already exists")
        
        for key, value in kwargs.items():
            if key == "username":
                existing_user = db.query(User).filter(User.username == value, User.id != user_id).first()
                if existing_user:
                    raise ValueError("Username already exists")
                if key == "password":
                    setattr(user, key, hash_password(value))
            else: setattr(user, key, value)

    db.commit()
    db.refresh(user)

    # Audit log 
    audit_service.log_action(db, user_id=user.id, action="update_user", details=f"User {user.username} updated.")

    return user



