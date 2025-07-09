# backend/app/schemas/supplier.py 

from pydantic import BaseModel, EmailStr, constr 
from typing import Optional
from datetime import datetime

class SupplierBase(BaseModel):
	name: constr(min_length=1)
	contact_person: Optional[str] = name 
	phone: Optional[str] = None 
    email: Optional[EmailStr] = None
	address: Optional[str] = None 
	
class SupplierCreate(SupplierBase)
	pass
	
class SupplierUpdate(BaseModel)
	name: Optional[constr(min_length=1] = None
	contact_person: Optional[str] = None 
	phone: Optional[str] = None 
	email: Optional[EmailStr] = None
	address: Optional[str] = None
	
class Supplier(SupplierBase):
	id: int
	created_at: datetime
	updated_at: Optional[datetime] = None
	
	class Config:
		orm_mode = True
		
		