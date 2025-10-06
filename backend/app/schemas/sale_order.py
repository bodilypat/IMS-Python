#app/schemas/sale_order.py

from pydantic import BaseModel, Field 
from typing import Optional, List 
from datetime import date, datetime
from enum import Enum
from app.schemas.sale_order_item import SaleOrderItemRead, SaleOrderItemCreate 

class OrderStatus(str, Enum):
    pending = "Pending"
    shipped = "Shipped"
    cancelled = "Cancelled"

class SaleOrderBase(BaseModel):
    customer_id: Optional[int] = Field(None, description="ID of the customer placing the order")
    order_date: date = Field(..., description="Date when the order was placed")
    status: OrderStatus = Field(default=OrderStatus.pending, description="Status of the sale order ")

class SaleOrderCreate(SaleOrderBase):
    items: Optional[List[SaleOrderItemCreate]] = [] 
    order_date: Optional[date] = None 
    status: Optional[OrderStatus] = None 

class SaleOrderRead(SaleOrderBase):
    id: int 
    created_at: datetime 
    updated_at: Optional[datetime] = None 
    items: Optional[List[SaleOrderItemRead]] = [] 

    class Config:
        orm_mode = True 
        