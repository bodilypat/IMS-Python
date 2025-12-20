#app/services/supplier_service.py

from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.supplier import Supplier
from app.models.product import Product
from typing import List, Optional
from app.services import audit_service # optional: for audit logging

#--------------------------------------
# Create Supplier
#--------------------------------------
def create_supplier(db: Session, name: str, contact_info: str, user_id: Optional[int] = None) -> Supplier:
    new_supplier = Supplier(name=name, contact_info=contact_info)
    db.add(new_supplier)
    try:
        db.commit()
        db.refresh(new_supplier)
        if user_id:
            audit_service.log_action(db, user_id, f"Created supplier with ID {new_supplier.id}")
        return new_supplier
    except IntegrityError:
        db.rollback()
        raise ValueError("Supplier with this name already exists.")
    
#--------------------------------------
# Update Supplier
#--------------------------------------
def update_supplier(db: Session, supplier_id: int, name: Optional[str] = None, contact_info: Optional[str] = None, user_id: Optional[int] = None) -> Supplier:
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise ValueError("Supplier not found.")
    
    if name:
        supplier.name = name
    if contact_info:
        supplier.contact_info = contact_info
    
    try:
        db.commit()
        db.refresh(supplier)
        if user_id:
            audit_service.log_action(db, user_id, f"Updated supplier with ID {supplier.id}")
        return supplier
    except IntegrityError:
        db.rollback()
        raise ValueError("Supplier with this name already exists.")
    
#--------------------------------------
# Delete Supplier
#--------------------------------------
def delete_supplier(db: Session, supplier_id: int, user_id: Optional[int] = None) -> bool:
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise ValueError("Supplier not found.")
    
    # Check for associated products
    associated_products = db.query(Product).filter(Product.supplier_id == supplier_id).count()
    if associated_products > 0:
        raise ValueError("Cannot delete supplier with associated products.")
    
    db.delete(supplier)
    db.commit()
    if user_id:
        audit_service.log_action(db, user_id, f"Deleted supplier with ID {supplier.id}")
    return True

#--------------------------------------
# Get Supplier by ID
#--------------------------------------
def get_supplier_by_id(db: Session, supplier_id: int) -> Optional[Supplier]:
    return db.query(Supplier).filter(Supplier.id == supplier_id).first()

#--------------------------------------
# List Suppliers
#--------------------------------------
def list_suppliers(db: Session, skip: int = 0, limit: int = 100) -> List[Supplier]:
    return db.query(Supplier).offset(skip).limit(limit).all()

#--------------------------------------
# Assign Supplier to Product
#--------------------------------------
def assign_supplier_to_product(db: Session, product_id: int, supplier_id: int, user_id: Optional[int] = None) -> Product:
    product = db.query(Product).filter(Product.id == product_id).first()
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    
    if not product:
        raise ValueError("Product not found.")
    if not supplier:
        raise ValueError("Supplier not found.")
    
    product.supplier_id = supplier_id
    db.commit()
    db.refresh(product)
    
    if user_id:
        audit_service.log_action(db, user_id, f"Assigned supplier ID {supplier_id} to product ID {product_id}")
    
    return product

#--------------------------------------
# Fetch Supplier Products 
#--------------------------------------
def fetch_supplier_products(db: Session, supplier_id: int) -> List[Product]:
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise ValueError("Supplier not found.")
    
    return db.query(Product).filter(Product.supplier_id == supplier_id).all()

