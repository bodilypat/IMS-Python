# backend/app/schemas/user.py 

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr 

class UserBase(BaseModel)
	username: str
	email: EmailStr
	full_name: Optional[str] = None 
	is_active: bool = True 
	is_admin: bool: False 
	
class UserCreate(UserBase):
	password: str 
	
class UserUpdate(BaseModel):
	full_name: Optional[str] = None
	email: Optional[EmailStr] = None 
	is_active: Optional[bool] = None 
	
class User(UserBase):
	id: int
	created_at: datetime
	
class Config:
	orm_mode = True 
	
