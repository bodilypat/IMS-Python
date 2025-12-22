#app/schemas/stock_movement.py

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

# Shared fields
class StockMovementBase(BaseModel):
    product_id: int
    quantity: int
    movement_type: Literal["IN", "OUT"] = Field(..., description="Type of stock movement: 'IN' for addition, 'OUT' for removal" )
    description: Optional[str] = Field(None, description="Optional description of the stock movement")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Timestamp of the stock movement")

# Schema for creating a stock movement
class StockMovementCreate(StockMovementBase):
    pass

# Schema for updating a stock movement
class StockMovementUpdate(BaseModel):
    quantity: Optional[int] = Field(None, description="Updated quantity of the stock movement")
    description: Optional[str] = Field(None, description="Updated description of the stock movement")
    timestamp: Optional[datetime] = Field(None, description="Updated timestamp of the stock movement")


# Schema for reading a stock movement
class StockMovementRead(StockMovementBase):
    id: int = Field(..., description="Unique identifier of the stock movement")

    class Config:
        orm_mode = True

        

