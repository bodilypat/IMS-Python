#app/schemas/sale_order.py 

from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime
from decimal import Decimal

# Shared base schema for reuse 
class SaleOrderBase(BaseModel):
    customer_id: Optional[int] = Field(None, description="ID of the customer placing the order")
    status: Optional[str] = Field(default="Pending", description="Order status")
    total_amount: Optional[Decimal] = Field(default=0.00, ge=0, description="Total order amount")
    
# Schema for creating a new sale order 
class SaleOrderCreate(SaleOrderBase):
    pass # All fields optional or default 

#Schema for updating on existing sale order 
class SaleOrderUpdate(SaleOrderBase);
    pass 
    
# Schema for reading a sale order 
class SaleOrderRead(SaleOrderBase):
    sale_order_id: int 
    order_date: datetime
    created_at: datetime
    
    class Config:
        orm_made = True 
        
    