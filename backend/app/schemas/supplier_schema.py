#app/schemas/supplier_schema.py

from pydantic import BaseModel, EmailStr, Field, constr
from typing import Optional
from datetime  import datetime

# Base Schema (shared fields)
class SupplierBase(BaseModel):
    supplier_name: constr(min_length=1, max_length=255) = Field(...,description="Supplier name")

    contact_person: Optional[constr(max_length=100)] = Field(None, description="Contact person for supplier name")
    contact_email: Optional[EmailStr] = Field(None, description="Supplier email")
    contact_phone: Optional[constr(min_length=7, max_length=20)] = Field(None, description="phone number of supplier")
    address: Optional[str] = Field(None, description="Supplier address")

    status: Optional[str] = Field( 
                            "Active",
                            description="Supplier status: (Active/Inactive)",
                            regex = "^(active|inactive)$"
                    )
    
# Create Schema 
class SupplierCreate(SupplierBase):
    """ Field required for creating a supplier """
    pass

# Update Schema
class SupplierUpdate(BaseModel):
    """ Fields for updating a supplier """
    supplier_name: Optional[constr(min_length=1, max_length=255)] = Field(None,description="Supplier name")

    contact_person: Optional[constr(max_length=100)] = Field(None, description="Contact person for supplier name")
    contact_email: Optional[EmailStr] = Field(None, description="Supplier email")
    contact_phone: Optional[constr(min_length=7, max_length=20)] = Field(None, description="phone number of supplier")
    address: Optional[str] = Field(None, description="Supplier address")

    status: Optional[str] = Field( 
                            None,
                            description="Supplier status: (Active/Inactive)",
                            regex = "^(active|inactive)$"
                    )

# Read Schema
class SupplierRead(SupplierBase):
    """ Fields for reading supplier data """
    supplier_id: int = Field(..., description="Unique identifier for the supplier")
    created_at: datetime = Field(..., description="Timestamp when the supplier was created")
    updated_at: datetime = Field(..., description="Timestamp when the supplier was last updated")
    is_deleted: bool = Field(..., description="Indicates if the supplier is deleted")
    deleted_at: Optional[datetime] = Field(None, description="Timestamp when the supplier was deleted")
    
    class Config:
        orm_mode = True
           

