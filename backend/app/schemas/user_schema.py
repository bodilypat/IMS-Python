# backend/app/schemas/user_schema.py

from typing import Optional
from enum import Enum
from datetime import datetime 
from pydantic import BaseModel, EmailStr, constr 

class UserStatus(str, Enum):
	Active = "Active"
	Inactive = "Inactive"
	Suspended = "Suspended"
	
class UserRole(str, Enum):
	Admin = "Admin"
	Manager = "Manager" 
	Employer = "Employee"
	
class UserBase(BaseModel):
	full_name: constr(max_length=100)
	user_name: constr(max_length=50)
	email: EmailStr 
	status: UserStatus = UserStatus.Active 
	role: UserRole =UserRole.Employee 
	last_login_at: Optional[datetime] = None 
	
class UserCreate(UserBase):
	password: constr(min_length=8) 
	
class UserUpdate(BaseModel):
	full_name: Optional[constr[max_length=100)] = None 
	username: Optinal[constr(max_length=50) = None 
	email: Optional[EmailStr] = None 
	status: Optional[UserStatus] = None 
	role: Optional[UserRole] = None 
	password: Optinal[constr(min_length=8)] = None 
	last_login_at: Optional[datetime] = None 
	
class UserInDB(UserBase):
	user_id: int 
	password_hash: str 
	created_at: datetime 
	deleted_at: datetime 
	deleted_at: Optional[datetime] = None 
	
	class Config:
		orm_mode = True 

class UserResponse(UserBase):
    user_id: int 
    created_at: datetime 
    updated_at: datetime
    
    class config = True
    
    
		