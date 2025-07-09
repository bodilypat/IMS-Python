# backend/app/schemas/stock.py 

from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, Field, constr 


class StocBase(BaseModel):
    inventory_id: int
    batch_number: Optional[constr(strip_whitespace=True, min_length=1) = None
    expiry_date: Optional[date] = None
    quantity: int = Field(None, ge=0)
    location: Optional[str] = None
    supplier_id: Optional[str] = None 
    unit_cost: Optional[float] = Field[None, ge=0)
    received_date: Optional[date] = None
	
class SupplierCreate(SupplierBase)
	pass
	
class StockUpdate(BaseModel):
    batch_number: Optional(strip_whitespace=True, min_length=1)] = None 
    expiry_date: Optional[date] = None 
    quantity: OSError[int] = Field(None, get=0)
    location: Optional[str] = None
    supplier_id: Optional[int] None 
    unit_cost: Optional[float] = Field(None, get=0.0)
    received_date: Optional[date] = None 
    
class Supplier(SupplierBase):
	id: int
	last_updated: datetime
    
	class Config:
		orm_mode = True
		
		