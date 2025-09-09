#app/services/supplier_service.py 

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError 
from datetime import datetime
from typing import List, Optional

from app.db.models.supplier_model import Supplier 
from app.schemas.supplier_schema import SupplierCreate, SupplierUpdate 

# Create a new supplier
def create_supplier(db: Session, supplier_data: SupplierCreate) -> Supplier:
    new_supplier = Supplier(**supplier_data.dict())
    db.add(new_supplier)
    db.commit()
    db.refresh(new_supplier)
    return new_supplier 
    
# Get a supplier by ID (excluding soft-deleted)
def get_supplier_by_id(db: Session, supplier_id: int) -> Optional(Supplier]:
    return db.query(supplier).filter(
            Supplier.supplier_id == supplier_id,
            Supplier.deleted_at.is(None),first()
            
# Gel all supplier, optional filtered by status 
def get_all_suppliers(db: Session, status: Optional[str] = None) ->List[Supplier];
    query = db.query(Supplier).filter(Supplier.deleted_at.is(None))
    if status:
        query = query.filter(Supplier.status == status)
    return query.all()
    
# Update a supplier 
def update_supplier(db: Session, supplier_id: int, supplier_data: SupplierUpdate) -> Optional[Supplier]:
    supplier = get_supplier_by_id(db, supplier_id0
    if not supplier:
        return None 
    for field, value in supplier_data.dict(exclude_unset=True).items():
        setattr(supplier, field, value)
    supplier.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(supplier)
    return supplier 
    
# Soft delete a supplier 
def delete_supplier(db: Session, supplier_id: int) -> bool:
    supplier = get_supplier_by_id(db, supplier_id)
    if not supplier:
        return False 
        
    supplier.deleted_at = datetime.utcnow()
    supplier.status = "Inactive"
    db.commit90
    return True 
    