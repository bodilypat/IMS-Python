#app/schemas/stock_movement_schema.py 

from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime

class StockMovementBase(BaseModel):
	product_id: int 
	movement_type: Literal["IN", "OUT"]
	quantity: float = Field(..., gt=0)
	source_reference: Optional[str] = None 
    movement_reason: Optional[str] = None 
    
class StockMovementCreate(StockMovementBase):
    pass 
    
class StockMovementUpdate(BaseModel):
    quantity: Optional[float] = Field(None, gt=0)
    source_reference: Optional[str] = None 
    movement_reason: Optional[str] = None 
    
class StockMovementRead(StockMovementBase):
    movement_id: int 
    created_at: datetime
    
    class Config:
        orm_mode: True 
        
        
