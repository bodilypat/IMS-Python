#app/schemas/supplier.py

from pydantic import BaseModel, EmailStr, constr, Field 
from typing import Optional
from datetime  import datetime

# Base Schema (shared fields)
class SupplierBase(BaseModel):
    name: constr(min_length=1, max_length=255) = Field(...,description="Supplier name")
    contact_email: Optional[EmailStr] = Field(None, descript="Supplier email")
    phone: Optional[constr(min_length=7, max_length=20)] = Field(None, description="Supplier phone")
    address: Optional[str] = Field(None, descriptin="Supplier address")

# Schema for creating a supplier 
class SupplierCreate(SupplierBase):
    pass

# Schema for updating a supplier 
class SupplierUpdate(BaseModel):
    name: Optional[constr(min_length=1, max_length=255)] = None 
    contact_email: Optional[EmailStr] = None 
    phone: Optional[constr(min_length=7, max_length=20)] = None 
    address: Optional[str] = None 

# Schema for reading supplier data 
class SupplierRead(SupplierBase):
    supplier_id: int 
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
        