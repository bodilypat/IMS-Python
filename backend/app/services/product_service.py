#app/services/product_service.py

from sqlalchemy.orm import Session
from app.models.product import Product
from app.services import audit_service

#------------------------------------
# Create Product 
#------------------------------------
def create_product(db: Session, product_data: dict, user_id: int) -> Product:
    """
    Create a new product
    """
    new_product = Product(**product_data)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    
    # Audit log
    audit_service.log_action(db, user_id, f"Created product with ID {new_product.id}")
    
    return new_product

#------------------------------------
# Get Product by ID
#------------------------------------
def get_product_by_id(db: Session, product_id: int) -> Product:
    """
    Retrieve a product by its ID
    """
    return db.query(Product).filter(Product.id == product_id).first()

#------------------------------------
# Get All Products
#------------------------------------
def get_all_products(db: Session, skip: int = 0, limit: int = 100) -> list[Product]:
    """
    Retrieve all products with pagination
    """
    return db.query(Product).offset(skip).limit(limit).all()

#------------------------------------
# Update Product
#------------------------------------
def update_product(db: Session, product_id: int, update_data: dict, user_id: int) -> Product:
    """
    Update an existing product
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise ValueError("Product not found")
    
    # Prevent name duplication
    if 'name' in update_data:
        existing_product = db.query(Product).filter(Product.name == update_data['name'], Product.id != product_id).first()
        if existing_product:
            raise ValueError("Product name already exists")
    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    
    # Audit log

    audit_service.log_product_change(db, user_id, product, action="updated")
    
    return product

#------------------------------------
# Delete Product
#------------------------------------
def delete_product(db: Session, product_id: int, user_id: int) -> None:
    """
    Delete a product by its ID
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise ValueError("Product not found")
    
    db.delete(product)
    db.commit()
    
    # Audit log
    audit_service.log_action(db, user_id, f"Deleted product with ID {product_id}")

    return True 

