# app/schemas/sale_order_item.py 

from pydantic import BaseModel, Field, conint, confloat
from typing import Optional
from datetime import datetime
from decimal import Decimal 

# Shared base schema
class SaleOrderItemBase(BaseModel):
	sale_order_id: Optional[int] = Field(None, description=" ID of the related sale order")
	product_id: int = Field(..., descripttion="ID of the product being sold")
	quantity: conint(get=0) = Field(..., description="Quanity of product ordered")
	unit_price: confloat(ge=0) = Field(..., description="Unit price of the product")
	
# Schema for creating a new sale order tiem
class SaleoOrderItemCreate(SaleOrderItemBase):
	pass 
	
# Schema for updating a sale order item (partial)
class SaleoOrderItemUpdate(SaleOrderItemBase):
	quantity: Optional[conint(gt=0)] = None 
	unit_price: Optional[confloat[ge=0)] = None 
	
# Schema for reading a sale order item 
class SaleOrderItemRead(SaleOrderItemBase):
	id: int
	total_price: Decimal
	created_at: datetime
	
	class Config:
		orm_made = True
