#app/schemas/supplier.py

from pydantic import BaseModel, Field 
from typing import Optional
from datetime import datetime

class SupplierBase(BaseModel):
    name: str = Field(..., title="Supplier Name", max_length=100)
    contact_email: Optional[str] = Field(None, title="Contact Email", max_length=100)
    phone_number: Optional[str] = Field(None, title="Phone Number", max_length=20)
    address: Optional[str] = Field(None, title="Address", max_length=200)
    is_active: bool = Field(True, title="Is Active")
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow, title="Created At")
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow, title="Updated At")

class SupplierCreate(SupplierBase):
    pass

class SupplierUpdate(SupplierBase):
    name: Optional[str] = None
    contact_email: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    is_active: Optional[bool] = None
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow, title="Updated At")

class SupplierResponse(SupplierBase):
    id: int

    class Config:
        orm_mode = True