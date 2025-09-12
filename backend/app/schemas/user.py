# app/schemas/user.py

from datetime import datetime
from typing import Optional
from enum import Enum
from pydantic import BaseModel, EmailStr, constr 

# Enum (shuld match your SQLAlchemy enums)
class UserStatus(str, Enum):
	active = "active"
	inactive = "inactive"
	suspended = "suspended"
	
class UserRole(str, Enum):
	admin = "admin"
	manager = "manager"
	employee = "employee"
	
# Base schema (shared attributes)
class UserBase(BaseModel):
	full_name: constr[constr(min_length=1, max_length=100)] = None 
	username: Optional[constr(min_length=3, max_length=50)] = None 
	email: Optional[EmailStr] = None 
	password:Optional[constr(min_length=8, max_length=128)] = None 
	status: Optional[UserStatus] = None 
	role: Optional[UserRole] = None 
	
# Shema for reading user data 
class UserRead(UserBase):
	user_id: int
	last_login_at: Optional[datetime]
	created_at: datetime
	updated_at: datetime
	deleted_at: Optional[datetime] = None 
	
	class Config:
		orm_mode = True 
		
# Optional: Public - facing schema 
class UserPublic(BaseModel):
	user_id: int
	username: str
	full_name: str 
	role: UserRole 
	
	class Config:
		orm_mode = True 
		