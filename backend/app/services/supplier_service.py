#app/services/supplier_service.py

from sqlalchemy.orm import Session
from app.models.supplier import Supplier
from app.models.product import Product
from sqlalchemy.exc import IntegrityError

#---------------------------------------
# Create  supplier
#---------------------------------------
def create_supplier(db: Session, name: str, contact_info: str) -> Supplier:
    new_supplier = Supplier(name=name, contact_info=contact_info)
    db.add(new_supplier)
    try:
        db.commit()
        db.refresh(new_supplier)
        return new_supplier
    except IntegrityError:
        db.rollback()
        raise ValueError("Supplier with this name already exists.")
    
#---------------------------------------
# Update supplier
#---------------------------------------
def update_supplier(db: Session, supplier_id: int, name: str = None, contact_info: str = None) -> Supplier:
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
        return supplier
    except IntegrityError:
        db.rollback()
        raise ValueError("Supplier with this name already exists.")
    
#---------------------------------------
# Delete supplier
#---------------------------------------
def delete_supplier(db: Session, supplier_id: int) -> None:
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise ValueError("Supplier not found.")
    
    # Check for associated products
    associated_products = db.query(Product).filter(Product.supplier_id == supplier_id).count()
    if associated_products > 0:
        raise ValueError("Cannot delete supplier with associated products.")
    
    db.delete(supplier)
    db.commit()
#---------------------------------------
# List suppliers
#---------------------------------------
def list_suppliers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Supplier).offset(skip).limit(limit).all()

#---------------------------------------
# Assign Supplier to Product
#---------------------------------------
def assign_supplier_to_product(db: Session, product_id: int, supplier_id: int) -> Product:
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise ValueError("Product not found.")
    
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise ValueError("Supplier not found.")
    
    product.supplier_id = supplier_id
    db.commit()
    db.refresh(product)
    return product

#---------------------------------------
# Remove Supplier from Product 
#---------------------------------------
def remove_supplier_from_product(db: Session, product_id: int) -> Product:
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise ValueError("Product not found.")
    
    product.supplier_id = None
    db.commit()
    db.refresh(product)
    return product

#---------------------------------------
# Fetch Supplier Products
#---------------------------------------
def fetch_supplier_products(db: Session, supplier_id: int):
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise ValueError("Supplier not found.")
    
    return db.query(Product).filter(Product.supplier_id == supplier_id).all()

#---------------------------------------
