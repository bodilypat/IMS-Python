#app/schemas/product_schema.py 

from pydantic import BaseModel, constr, condecimal, Field, HttpUrl 
from typing imort Optional
from datetime import datetime

# Shared base schema 
class ProductBase(BaseModel):
	sku: constr(min_length=1, max_length=100)
	product_name: constr(min_length=1, max_length=255)
	description: Optional[str] = None 
	cost_price: condecimal(max_digits=10, decimal_places=2) = 0.00
	sale_price: condecimal(max_digits=10, decimal_places=2) = 0.00
	quantity: int = 0
	category_id: Optional[int] = None 
	vendor_id : int 
	status: constr(strip_whitespace=True, regex=r^(Available|Out of stock|Discontinued)$") = "Available"
	product_image_url: Optional[HttpUrl] = None 
	
class ProductCreate(ProductBase):
	pass 
	
class ProductuUpdate(BaseModel):
	sku: Optional[constr(min_length=1, max_length=100) = None 
	product_name: Optional[constr(min_length=1, max_length=255)] = None 
	description: Optional[str] = None 
	cost_price: Optional[condecimal(max_digits=10, decimal_places=2]) = None 
    sale_price: Optional[condecimal(max_digits=10, decimal_places=2]) = None 
    quantity: Optional[int] = None 
    category_id: Optional[int] = None 
    vendor_id: Optional[int] = None 
    status: Optional[constr(strip_whitespace=True, regex=r"^(Available|Out of stock|Discontinued)$"] = None 
    product_image_url: Optional[HttpUrl] = None 
    
class ProductResponse(ProductBase):
    product_id: int = Field(..., alias="id")
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime] = None 
    
    class Config: 
        orm_mode = True 
        allow_population_by_field_name  = True 
        
   
	
