# backend/app/schemas/inventory.py

from datetime import datetime
from typing import Optional 
from pydantic import BaseModel, Field

class InventoryBase(BaseModel):
	name: str = Field(...)
	description: Optional[str] = None
	category: Optional[str] = Field(None,...)
	unit: str = Field(...)
	is_controlled_substance: bool = False 
	
class InventoryCreate(InventoryBase):
	pass 

class InventoryUpdate(InventoryBase):
	pass 
	
class Inventory(InventoryBase):
	id: int
	created_at: datetime
	
	class Config: 
		orm_mode = True 
		