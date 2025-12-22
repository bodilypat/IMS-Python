#app/schemas/order.py

from pydantic import BaseModel
from datetime import datetime

class OrderBase(BaseModel):
    item_id: int
    quantity: int
    price: float
    status: str

class OrderCreate(OrderBase):
    product_id: int
    quantity: int

class OrderUpdate(OrderBase):
    status: str
    updated_at: datetime

class OrderResponse(OrderBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

