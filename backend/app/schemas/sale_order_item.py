#app/schemas/sale_order_item.py

from pydantic import BaseModel, Field, conint, confloat 
from typing import Optional
from datetime import datetime
from decimal import Decimal

# Shared base schema 
class SaleOrderItemBase(BaseModel):
    sale_order_in: Optional[int] = Field(None, description="ID of related sale order")
    product_id: int = Field(..., description="ID of the product being sold")
    quantity: conint(gt=0) = Field(..., description="Quantity of product ordered")
    unit_price: confloat(ge=0) = Field(..., description="Unit price of the product")

# Schema for creating a new sale order item 
class SaleOrderItemCreate(BaseModel):
    pass

# Schema for updating a sale order item (partial update)
class SaleOrderItemUpdate(BaseModel):
    quantity: Optional[conint(get=0)] = None 
    unit_price: Optional[confloat(ge=0)] = None

# Schema for reading a sale order item 
class SaleOrderItemRead(SaleOrderItemBase):
    id: int
    total_price: Decimal # This must be calculated and returned from DB/service
    created_at: datetime # This must be in the SQLAlchemy model 

    class Config:
        orm_mode = True 

