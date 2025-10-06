#app/schemas/vendor.py

from pydantic import BaseModel, EmailStr, constr, Field 
from typing import Optional
from datetime import datetime 

# Shared base schema 
class VendorBase(BaseModel):
    name: constr(min_length=1, max_length=255) = Field(..., description="Name of the vendor")
    contact_email: Optional[EmailStr] = Field(None, description="Vendor contact email")
    phone: Optional[constr(min_length=7, max_length=20)] = Field(None, description="Vendor Phone number")
    address: Optional[str] = Field(None, description="Physical address of the vendor")

# Schema for creating a vendor 
class VendorCreate(VendorBase):
    pass 

# Schema for updating a vendor 
class VendorUpdate(BaseModel):
    name: Optional[constr(min_length=1, max_length=255)] = None 
    contact_email: Optional[EmailStr] = None 
    phone: Optional[constr(min_length=7, max_lengthp=20)] = None 
    address: Optional[str] = None 

    class Config:
        orm_mode = True 

        