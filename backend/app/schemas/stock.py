# backend/app/schemas/stock.py 

from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, Field, constr 


class StockBase(BaseModel):
    inventory_id: int
    supplier_id: Optional[int] = None
    batch_number: Optional[constr(strip_whitespace=True, min_length=1) = None
    expiry_date: Optional[date] = None
    quantity: int = Field(..., ge=0)
    location: Optional[str] = None
    supplier_id: Optional[str] = None 
    unit_cost: Optional[float] = Field(None, ge=0)
    received_date: Optional[date] = None
	
class StockCreate(SupplierBase)
	pass
	
class StockUpdate(BaseModel):
    batch_number: Optional(strip_whitespace=True, min_length=1)] = None 
    expiry_date: Optional[date] = None 
    quantity: Optional[int] = Field(None, get=0)
    location: Optional[str] = None
    supplier_id: Optional[int] None 
    unit_cost: Optional[float] = Field(None, get=0.0)
    received_date: Optional[date] = None 
    
class Stock(StockBase):
	id: int
	last_updated: Optional[datetime]
    
	class Config:
		orm_mode = True
		
		