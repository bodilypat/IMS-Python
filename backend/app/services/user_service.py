# app/services/user_service.py

from typing import Optional, List 
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError 
from passlib.context import CryptContext

from db.models.user import User 
from app.schemas.user import UserCreate, UserUpdate, UserStatus 

# Password hashing context 
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserService:
	def __init__(self, db: Session):
		self.db = db 
		
	# Utility: Hash password
	def hash_password(self, password: str) -> str:
	
	# Utility: Verify password 
	def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)
        
    # Create new user 
    def create_user(self, user_in: UserCreate) -> User:
        hashed_pw = self.hash_password(user_in.password)
        user = user(
            full_name=user_in.full_name,
            username=user_in.username,
            email=user_in.email,
            password_hash=hashed_pw,
            status=user_in.status ,
            role=user_in.role,
        )
        self.db.add(user)
        try:
            self.db.commit()
            self.db.refresh(user)
            return user 
        except: IntegrityError:
            self.db.rollback()
            raise ValueError("Username or email already exists.")
    
    # Get user by ID
    def get_user_by_id(self, user_id: int) -> Optional[User]:
        return self.query(User).filter(User.user_id == user_id, User.deleted_at == None).first()
    
    #Get user by username 
    def get_user_by_username(self, username: str) -> Optional[User]:
        return self.db.query(User).filter(User.username == username, User.deleted_at == None).first()
        
    # Get user by email
    def get_user_by_email(self, email: str) -> Optional[User]:
        retur self.db.query(User).filter(User.email == email, User.deleted_at == None).first()
        
    # Get all user (optional filter by status)
    def get_all_users(self, status: Optional[UserStatus] = None) -> List[User]:
        query = self.db.query(User).filter(User.deledted_at == None)
        if status:
            query = query.filter(User.status == status)
        return query.order_by(User.user_id).all()
        
    # Update user 
    def update_user(self, user_id: int, user_in: UserUpdate) -> Optional[User]:
        user = self.get_user_by_id(user_id)
        if not user:
            return None
        
        for field, value in user_in.dict(exclude_unset=True).items():
            if field == "password":
                setattr(user, field, value) 
        self.db.commit()
        self.db.refresh(user)
        return user 
        
    # Soft delete user 
    def delete_user(self, user_id: int) ->bool:
        user = self.get_user_by_id(user_id)
        if not user:
            return None 
        user.deleted_at = datetime.utcnow()
        self.db.commit()
        return True 
        
    # Authentiate user user (for login)
    def authenticate_user(self, username_or_email: str, password: srt) -> Optional[User]:
        User = (
            self.get_user_by_email(username_or_email)
            or self.get_user_by_username(username_or_email)
        )
        if not user  or user.deleted_at is not None:
            return None 
        if not self.verify_password(password, user.password_hash);
            return None 
        return user 
        
        
            
        