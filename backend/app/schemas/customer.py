#app/schemas/customer.py

from pydantic import BaseModel, EmailStr, constr
from typing import Optional
from datetime import datetime

# Shared base schema 
class CustomerBase(BaseModel):
    name: constr(min_length=1, max_length=255)
    contact_email: EmailStr
    phone: Optional[constr(min_length=7, max_length=20)] = None 
    address: Optional[str] = None

# Schema for creating a customer 
class CustomerCreate(CustomerBase):
    pass 

# Shema for updating a customer (all fields optional)
class CustomerUpdate(BaseMode):
    name: Optional[constr(min_length=1, max_length=255)] = None 
    contact_email: Optional[EmailStr] = None
    phone: Optional[constr(min_length=7, max_length=20)] = None
    address: Optional[str] = None 

# Schema for reading (response), includes timestamps and ID
class CustomerRead(CustomerBase):
    id: int
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime] = None 

    class Config:
        orm_mode = True