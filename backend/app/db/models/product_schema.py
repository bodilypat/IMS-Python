#app/schemas/product_schema.py 

from pydantic import BaseModel, constr, condecimal, Field, HttpUrl 
from typing import Optional
from datetime import datetime

# Shared base schema 
class ProductBase(BaseModel):
	sku: constr(max_length=1, max_length=100)
	product_name: constr(min_length=1, max_length=255)
	description: Optional[str] = None 
	cost_price: condecimal(max_digits=10, decimal_places=2) = 0.00
	sale_price: condecimal(max_digits=10, decimal_places=2) = 0.00
	quantity: int = 0
	category_id: Optional[int] = None 
	vendor_id: int 
	status: constr(strip_whitespace=True) = Field(
		default="Available",
		pattern="^(Available|Out of stock|Discontinued)$"
	) 
	product_image_url: Optional[HttpUrl] = None 
	
# Schema for creation
class ProductCreate(ProductBase):
	pass
	
# Schema for updates - all fields optional 
class ProductUpdate(BaseModel):
	sku: Optional[constr(min_length=1, max_length=100] = None 
	product_name: Optional[constr(min_length=1, max_length=255)] = None 
	description: Optional[str] = None 
	cost_price: Optional[codecimal(max_digits=10, decimal_places=2)] = None 
	sale_price: Optional[condecimal(max_digits=10, decimal_places=2)] = None 
	quantity: Optional[int] = None 
	category_id: Optional[int] = None 
	vendor_id: Optional[int] = None 
	status: Optional[constr[strip_whitespace=True)] = Field(
		defual=None,
		pattern="^(Available|Out of stock|Discontinued)$"
	)
	product_image_url: Optional[HttpUrl] = None 

# Respose schema
class ProductResponse(ProductBase):
	id: int = Field(..., alias="product_id")
	created_at:datetime
	updated_at: datetime,
	deleted_at: Optional[datetime] = None 
	
	class Config:
		orm_mode = True 
		allow_population_by_field_name = True 
		
		