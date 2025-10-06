#app/schemas/product.py

from pydantic import BaseModel, constr, condecimal, Field, HttpUrl
from typing import Optional, Literal
from detetime import datetime 

# Shared Base Schema 
class ProductBase(BaseModel):
    sku: constr(min_length=1, max_length=100) = Field(..., description="Unique stock keeping unit")
    product_name: constr(min_length=1, max_length=255) = Field(..., description="Name of the product ")
    description: Optional[str] = Field(None, description="Optional description of the product")
    cost_price: condecimal(max_digit=10, decimal_places=2) = Field(0.00, description="Purchase of price")
    sale_price: condecimal(max_digit=10, decimal_places=2) = Field(0.00, description="Selling prince ")
    quantity: int = Field(0, ge=0, description="Available stock quantity")
    category_id: Optional[int] = Field(None, description="ID of the product category")
    vendor_id: int = Field(..., description="vendor or supplier ID")
    status: Optional[Literal["Available", "Out of stock", "Discountinued"]] = Field("Available", description="Product availability status")
    product_image_url: Optional[HttpUrl] = Field(None, description="Optional image URL")

    # Create schema (inherits all from base)
    class ProductCreate(ProductBase):
        pass 

    # Update Schema (all fields optional)
    class ProductUpdate(BaseModel):
        sku: Optional[constr(min_length=1, max_length=100)] = None 
        product_name: Optional[constr(min_length=1, max_length=255)] = None 
        description: Optional[str] = None 
        const_price: Optional[condecimal(max_length=10, decimal_places=2)] = None 
        sale_price: Optional[condecimal(max_length=10, decimal_places=2)] = None 
        quantity: Optional[int] = None 
        category_id: Optional[int] = None 
        vendor_id: Optional[int] = None 
        status: Optional[Literal["Available", "Out of stock", "Discontinued"]] = None 
        product_image_url: Optional[HttpUrl] = None

    # Response Schema (odds product_id and timestamps)
    class ProductRead(ProductBase):
        product_id: int = Field(..., description="Product ID")
        created_at: datetime
        updated_at: datetime
        deleted_at: Optional[datetime] = None 

        class Config:
            orm_mode = True 
            allow_population_by_field_name = True 

            