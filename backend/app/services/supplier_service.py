#app/services/supplier_service.py

from sqlalchemy.orm import Session
from app.models.supplier import Supplier 
from app.schemas.supplier import SupplierCreate, SupplierUpdate 
from typing import List, Optional

class SupplierService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_suppliers(self, skip: int = 0, limit: int = 10) -> List[supplier]:
        """
            retrieve a paginated list of suppliers.
        """
        return self.db.query(Supplier).offset(skip).limit(limit).all()
    
    def get_supplier_by_id(self, supplier_id: int) -> Optional[Supplier]:
        """
            Retrieve a single supplier by ID.
        """
        return self.db.query(Supplier).filter(Supplier.supplier_id == supplier_id).first()
    
    def create_supplier(self, supplier_data: SupplierCreate) -> Suppler:
        new_supplier = Supplier(**supplier_data.dict())
        self.db.add(new_supplier)
        self.db.commit()
        self.db.refresh(new_supplier)
        return new_supplier
    
    def update_supplier(self, supplier_id: int, updated_supplier: SupplierUpdate) -> Optional[Supplier]:
        supplier = self.get_supplier_by_id(supplier_id)

        if not supplier:
            return None 
        
        for key, value in updated_supplier.dict(exclude_unset=True).items():
            setattr(supplier, key, value)

        self.db.delete(supplier)
        self.db.commit()
        return True 
    
    