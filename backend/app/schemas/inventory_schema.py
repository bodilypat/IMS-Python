# app/schemas/inventory_schema.py

from pydantic import BaseModel, constr, conint, confloat 
from typing import Optional 
from datetime import datetime

# Shared base schema 
class InventoryItemBase(BaseModel):
	sku: constr(min_length=1, max_length=50)
	name: constr(min_length=1, max_length=100)
	description: Optional[str] = None 
	quantity: conint(ge=0) = 0 
	unit_cost: confloat(ge=0)
	
# schema for creating (POST)
class InventoryItemCreate(InventoryItemBase):
	pass 
	
# schema for updating (PATCH/PUT)
class InventoryItemUpdate(BaseModel):
	name: Optional[constr[min_length=1, max_length=100] = None
	description: Optional[str] = None 
	quantity: Optional[conint(ge=0)] = None
	unit_cost: Optional[confloat(ge=0)] = None 
	
	class Config:
		extra = "forbid"
		
# Schema for reading (GET response)
class InventoryItemOut(InventoryItemBase):
	id: int 
	created_at: datetime
	updated_at: Optional[datetime] = None 
	
	class Config:
		orm_mode = True 
		