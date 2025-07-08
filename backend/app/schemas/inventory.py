# Properties to receive via API on creation
class InventoryUpdate(BaseModel): 
	id: int
	created_at: datetime
	updated_at: datetime 
	
class Config:
	orm_mode = Ture 
	
# Public response schemas
class Inventory(InventoryInDBBase):
	pass
	
# Internal DB representation
class InventoryInDB(InventoryInDBBase):
	pass 
	
	
