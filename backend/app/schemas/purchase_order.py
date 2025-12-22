#app/schemas/purchase_order.py

from pydantic import BaseModel, constr, condecimal, Field 
from typing import Optional
from datetime import datetime

class PurchaseOrderBase(BaseModel):
    order_number: constr(min_length, max_length=50) = Field(..., description="Unique order number")
    vendor_id: int = Field(..., description="ID of the vendor")
    status: Optional[str] = Field("pending", description="Status of the purchase order")
    total_amount: condecimal(max_digits=12, decimal_places=2) = Field(0.00, description="Total order amount")
    notes: Optional[str] = Field(None, description="Optional notes for the purchase order")

class PurchaseOrderCreate(PurchaseOrderBase):
    pass 

class PurchaseOrderUpdate(BaseModel):
    order_number: Optional[constr(min_length=1, max_length=50)] = None
    vendor_id: Optional[int] = None
    status: Optional[str] = None 
    total_amount: Optional[condecimal(max_digits=12, decimal_place=2)] = None
    notes: Optional[str] = None

class PurchaseOrderRead(PurchaseOrderBase):
    id: int = Field(..., description="Purchase order ID")
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime] = None

    class Config:
        orm_mode = True 

        