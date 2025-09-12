# app/schemas/purchase_order_item.py 

from pydantic import BaseModel, Field, conint, condecimal
from typing import Optional
from decimal import Decimal

# Shared Base 
class PurchaseOrderItemBase(BaseModel):
	purchase_order_id: int = Field(..., description="Associated purchase order ID")
	product_id: int = Field(...,description="Product ID")
	quantity: conint(gt=0) = Field(..., description="Quantity ordered (> 0)")
	unit_price: condecimal(max_digits=12, decimal_places=2, ge=0) = Field(..., description="Unit price (>= 0)")
	
# Shared Base 
class PurchaseOrderItemCreate(BaseModel):
	pass 
	
# For Update
class PurchaseOrderItemUpdate(BaseModel):
	quantity: Optional[conint(gt=0)] = None 
	unit_price: Optional[condecimal(max_digits=12, decimal_places=2, ge=0)] = None 
	
# For Response 
class PurchaseOrderItemOut(PurchaseOrderItemBase):
	id: int
	total_price: Decimal
	
	class Config:
		orm_mode = Ture 
		
		