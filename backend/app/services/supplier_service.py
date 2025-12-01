#app/services/supplier_service.py

from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status

from app.models.supplier import Supplier
from app.schemas.supplier_schema import SupplierCreate, SupplierUpdate
from typing import List, Optional

class SupplierService:
    """  """
    def __init__(self, db: Session):
        self.db = db

# Helper: Get supplier or raise 404

    def get_supplier_or_404(self, supplier_id: int) -> Optional[Supplier]:
        supplier = (
            self.db.query(Supplier)
            .filter(Supplier.supplier_id == supplier_id, Supplier.is_deleted == False)
            .first()
        )
        if not supplier:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Supplier with id {supplier_id} not found",
            )   
        return supplier
    
# GET ALL SUPPLIERS
    def get_all_suppliers(self, skip: int = 0, limit: int = 100) -> List[Supplier]:
        return (
            self.db.query(Supplier)
            .filter(Supplier.is_deleted == False)
            .offset(skip)
            .limit(limit)
            .all()
        )

# GET SUPPLIER BY ID
    def get_supplier_by_id(self, supplier_id: int) -> Optional[Supplier]:
        return (
            self.db.query(Supplier)
            .filter(Supplier.supplier_id == supplier_id, Supplier.is_deleted == False)
            .first()
        )
    
# CREATE, UPDATE, DELETE SUPPLIER
    def create_supplier(self, supplier: SupplierCreate) -> Supplier:
        new_supplier = Supplier(**supplier.dict())
        try:
            self.db.add(new_supplier)
            self.db.commit()
            self.db.refresh(new_supplier)
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Supplier with the same details already exists.",
            )
        return new_supplier

# UPDATE SUPPLIER
    def update_supplier(self, supplier_id: int, supplier: SupplierUpdate) -> Optional[Supplier]:

        db_supplier = self.get_supplier_by_id(supplier_id)

        if not db_supplier:
            return None
        
        for key, value in supplier.dict(exclude_unset=True).items():
            setattr(db_supplier, key, value)
        self.db.commit()
        self.db.refresh(db_supplier)
        return db_supplier

# SOFT DELETE SUPPLIER
    def delete_supplier(self, supplier_id: int) -> bool:
        db_supplier = self.get_supplier_by_id(supplier_id)
        if not db_supplier:
            return False
        db_supplier.is_deleted = True
        db_supplier.deleted_at = func.now()

        self.db.commit()
        return True
    

# RESTORE A SOFT DELETED SUPPLIER
    def restore_supplier(self, supplier_id: int) -> bool:
        db_supplier = (
            self.db.query(Supplier)
            .filter(Supplier.supplier_id == supplier_id, Supplier.is_deleted == True)
            .first()
        )
        if not db_supplier:
            return False
        db_supplier.is_deleted = False
        db_supplier.deleted_at = None

        self.db.commit()
        return True
    
# HARD DELETE SUPPLIER
    def hard_delete_supplier(self, supplier_id: int) -> bool:
        db_supplier = self.get_supplier_by_id(supplier_id)
        if not db_supplier:
            return False
        self.db.delete(db_supplier)
        self.db.commit()
        return True 
    
