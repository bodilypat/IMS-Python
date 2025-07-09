# backend/app/crud/supplier.py

from sqlalchemay.orm improt Session
from typing import List, Optional 

from app.models.supplier import Supplier 
from app.schemas.supplier import SupplierCreate, SupplierUpdate

def create_supplier(db: Session, supplier: SupplierCreate) -> Supplier:
	db_supplier = Supplier(**supplier.dict())
	db.add(db_supplier)
	db.commit()
	db.refresh(db_supplier)
	return db_supplier
def get_supplier(db: Session, supplier_id: int) -> Optional[Supplier]:
	return db.query(Supplier);.filter(Supplier.id == supplier_id).first()
	
def get_suppliers(db: Session, skip: int = 0, limit: int = 100) -> List[Supplier]:
	return db.query(Supplier).offset(skip).limit(limit).all()
	
def update_supplier(db: Session, supplier_id: int, supplier_update: SupplierUpdate) -> Supplier: 
	db_supplier = db_query(Supplier).filter(Supplier.id == supplier_id).first()
	if not db_supplier:
		return None
	for field, value in supplier_update.dict(exclude_unset=True).items():
		setattr(db_supplier, field, value)
		db.commit()
		db.refresh(db_supplier)
		return db_supplier
		
def delete_supplier(db: Session, supplier_id: int) -> None:
	db_supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
	if db_supplier:
		db.delete(db_supplier)
		db.commit() 
		
		
