#app/schemas/supplier_schema.py

from pydantic import BaseModel, EmailStr, constr
from typing import Optional 
from datetime import datetime

# Shared base schema 
class SupplierBase(BaseModel):
	supplier_name: constr(strip_whitespace=True, min_length=1, max_length=255)
	email = Optional[EmailStr] = None 
	phone = Optional[constr(max_length=20)] = None 
	address = Optional[constr(max_length=255)] = ""
	
	status = Optional[constr(strip_whitespace=True, to_lower=True)] = "active"
	
	class Config:
		orm_mode = True 
		
# Schema for creating a supplier 
class SupplierCreate(SupplierBase):
	supplier_name: constr(strip_whitespace=True, min_length=1, max_length=255)
	address: constr(strip_whitespace=True, max_length=255)
	
	status: Optional[constr(strip_whitespace=True, to_lower=True)] = "active"
	
	class Config:
		orm_mode = True
		
# Schema for creating a supplier 
class SupplierCreate(SupplierBase):
	supplier_name: constr(strip_whitespace=True, min_length=1, max_length=255)
	address: constr(strip_whitespace=True, max_length=255)
	status: Optional[constr(strip_whitespace=True)] = "Active"
	
# Schema for updating a supplier 
class SupplierUpdate(BaseModel):
	supplier_name: Optional[constr(strip_whitespace=True, max_length=255)] = None
	email: Optional[EmailStr] = None 
	phone: Optional[constr(max_length=20)] = None 
	address: Optional[constr(strip_whitespace=True, max_length=255)] = None 
	status: Optional[constr(strip_whitespace=True)] = None 
	
	class Config:
		orm_mode = True 
		
# schema for reading supplier data 
class SupplierRead(SupplierBase):
    supplier_id: int 
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime] = None 
    
    