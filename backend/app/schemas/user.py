# backend/app/schemas/user.py 

from datetime import datetime
from pydantic import BaseModel, EmailStr 

class UserBase(BaseModel)
	username: str
	email: EmailStr
	full_nam: str | Node = None 
	is_active: bool = True 
	is_admin: bool: False 
	
class UserCreate(UserBase):
	password: str 
	
class UserUpdate(BaseModel):
	full_name: str | None = None 
	email: EmailStr | None = None 
	is_active: bool | None = None 
	
class User(UserBase):
	id: int
	created_at: datetime
	
class Config:
	orm_mode = True 
	
