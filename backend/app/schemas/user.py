#app/schemas/user.py

from typing import Optional
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

#-----------------------------------
# Create User Schema
#-----------------------------------
class UserCreate(UserBase):
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(default=None, min_length=8, max_length=128)

#-----------------------------------
# Update User Schema
#-----------------------------------
class UserUpdate(UserBase):
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(default=None, min_length=8, max_length=128)

#-----------------------------------
# Read / Response 
#-----------------------------------
class UserRead(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

        