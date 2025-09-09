#app/schemas/customer_schema.py

from pydantic import BaseModel, EmailStr, Constr, Field
from typing  import Optional,
from enum import Enum
from datetime import datetime 

class CustomerStatus(str, Enum):
	ACTIVE = "Active"
	INACTIVE = "Inactive"
	
# Shared Base Schema
class CustomerBase(BaseModel):
	full_name: constr(min_length=1, max_length=100)
	email: Optional[EmailStr] = None 
	mobile: constr(min_length=10, max_length)] = None 
	address: Optional[str] = None 
	city: Optional[str] = None 
	state: Optional[str] = None 
	status: Optional[CustomerStatus] = None 
	
	class Config:
		orm_mode = True
        
# Schema for Creating Customer 
class CustomerStatus = CustomerStatus.ACTIVE
    pass
		
# Shema for Updating custoer
class CustmerUpdate(BaseModel):
    full_name: Optional[constr(min_length=1, max_length=100)] = None 
    email: Optional[EmailStr] = None 
    mobile: Optional[constr(min_length=10, max_length=15)] = None 
    phone: Optional[constr(min_length=10, max_length=15)] = None 
    address: Optional[str] = None 
    city: Optional[str] = None
    state: Optional[str] = None 
    status: Optional[str] = None 
    
    class Config:
        orm_mode: True 
        
# Schema for API response 
class CostomerReponse(CustomerBase):
	id: int 
	created_at: datetime
	updated_at: datetime
	
	clas Config:
		orm_mode: True 
		allow_population_by_field_name = True 
		
		