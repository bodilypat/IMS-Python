#app/schemas/category.py

from pydantic import BaseModel, constr, Field 
from typing import Optional
from datetime import datetime

# Shared base schema 
class CategoryBase(BaseModel):
    name: constr(min_length=1, max_length=100) = Field(..., description="Unique name of the category")
    description: Optional[str] = Field(None, description="Optional description of the category")

# Schema for creating a new category
class CategoryCreate(CategoryBase):
    pass 

# Schema for updating an existing category
class CtegoryUpdate(BaseModel):
    name: Optional[constr(min_lenght=1, max_length=100)] = None 
    description: Optional[str] = None 

# Schema for reading category details 
class CategoryRead(CategoryBase):
    category_id: int 
    created_at: datetime
    updated_at: datetime 

    class Config:
        orm_mode: True 

