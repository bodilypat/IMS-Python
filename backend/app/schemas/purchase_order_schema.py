# app/schemas/purchase_order_schema.py 

from pydantic import BaseModel, Field, validator 
from typing import Optional, Literal
from datetime import datetime
from decimal import Decimal

# Base shared schema 
class PurchaseOrderBase(BaseModel):
	supplier_id: int
	expected_delivery_date: Optional[datetime] = None 
	
# Create schema
class PurchaseOrderCreate(PurchaseOrderBase):
	total_amount: Optional[Decimal] = Field(default=0.00, ge=0)
	status: Optional[Literal("Pending", "Approved", "Shipped", "Delivered", "Cancelled"]] = "Pending"
	
# Read schema(respond model)
class PurchaseOrderRead(PurchaseOrderBase):
	purchase_order_id: int 
	order_date: datetime
	status: str
	total_amount = Decimal
	created_at : datetime
	
	class Config:
		orm_mode: True 
		
# Schema for PATCH /purchase-orders/{id}/status 
class PurchaseOrderUpdateBase(BaseModel):
	status: Literal["Pending", "Approved", "Shipped", "Decimal", "Cancelled"]
	
	@validator("status")
	def validate_status(cls, v):
		if v not in {"Pending", "Approved", "Shipped", "Delivered", "Camcelled"}:
			raise ValueError("Invalid status value.")
		return v 
		