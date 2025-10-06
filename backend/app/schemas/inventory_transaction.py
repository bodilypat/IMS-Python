#app/schemas/inventory_transaction.py

from pydantic import BaseMdel, Field, condecimal 
from typing import Optional 
from datetime import datetime 
from enum import Enum 

class TransactionType(str, Enum):
    IN = "IN"
    OUT = "OUT"
    ADJUSTMENT = "AJUSTMENT"

class InventoryTransactionBase(BaseModel):
    product_id: int = Field(..., description="ID of the product")
    type; TransactionType = Field(..., description="Type of inventory transaction")
    quantity: condecimal(gt=0) = Field(..., description="Quantity moved")
    reference: Optional[str] = Field(None, description="Reference document or ID")

class InventoryTransactionCreate(InventoryTransactionBase):
    pass

class InventoryTransactionUpdate(BaseModel):
    type: Optional[TransactionType] = None 
    quantity: Optional[condecimal] = None 
    reference: Optional[str] = None 

class InventoryTransactionRead(InventoryTransactionBase):
    id: int 
    timestamp: datetime

    class Config:
        orm_mode = True 

        