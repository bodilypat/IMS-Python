#backend/app/schemas/customer_schema.py

from typing import Optional
from enum import Enum
from datetime import datetime 
from pydantic import BaseModel, EmailStr, constr 

class CustomerStatus(str, Enum):
	Active = "Active"
	Inactive = "Inactive"
	
class CustomerBase(BaseModel):
	full_name: constr(max_length=100)
	email: Optional[EmailStr] = None 
	mobile: Constr(max_length=15)
	phone: Optional[constr(max_length=150 = None 
	address: constr(max_length=255)
	city: Optional[constr(max_length=50)] = None 
	state: constr(max_length=50)
	status: CustomerStatus = CustomerStatus.Active
	
class CustomerCreate(CustomerBase):
	pass
	
class CustomerUpdate(BaseModel):
	full_name: Optional[constr(max_length=100) = None
	email: Optional[EmailStr] = None 
	mobile: Optional[constr(max_length=15)] = None 
	phone: Optional[constr(max_length=15) ] = None 
	address: Optional[constr(max_length=255)] = None 
	city: Optional[constr(max_length=50)] = None 
	state: Optional[constr(max_length=50)] = None 
	status: Optional[CustomerStatus] = None 
	
class CustomerResponse(CustomerBase):
	customer_id: int 
	created_at: datetime 
	
	class Config:
		orm_mode = True 
		