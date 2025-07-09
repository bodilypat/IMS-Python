# backend/app/schemas/inventory.py

from datetime import datetime
from typing import Optional 
from pydantic import BaseModel, Field

class InventoryBase(BaseModel):
	name: str = Field(...,min_length=1)
	description: Optional[str] = None
	category: Optional[str] = None
	unit: str = Field(..., min_length=1)
	is_controlled_substance: bool = False 
	
class InventoryCreate(InventoryBase):
	pass 

class InventoryUpdate(InventoryBase):
	name: Optional[str] = None
    description: Optional[str] = None 
    category: Optional[str] = None 
    unit: Optional[str] = None
    is_controlled_subtance: Optional[bool] = None 
	
class Inventory(InventoryBase):
	id: int
	created_at: datetime
	
	class Config: 
		orm_mode = True 
		