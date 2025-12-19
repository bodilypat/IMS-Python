#app/services/stock_service.py

from sqlalchemy.orm import Session
from app.models.product import Product
from app.models.stock import StockMovement
from app.services import audit_service 

#-------------------------------------
# Stock In
#-------------------------------------
def stock_in(db: Session, product_id: int, quantity: int, user_id: int):
    """Increase stock quantity for a product and log the movement."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise ValueError("Product not found")

    product.stock_quantity += quantity
    stock_movement = StockMovement(
        product_id=product_id,
        quantity=quantity,
        movement_type='IN',
        user_id=user_id
    )
    db.add(stock_movement)
    db.commit()
    audit_service.log_action(db, user_id, f'Stocked in {quantity} units of product ID {product_id}')
    return product

#-------------------------------------
# Stock Out
#-------------------------------------
def stock_out(db: Session, user_id: int, product_id: int, quantity: int, reference: str = None):
    """
    Remove stock from inventory.
    """
    if quantity <= 0:
        raise ValueError("Quantity must be greater than zero")
    
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise ValueError("Product not found")
    if product.stock_quantity < quantity:
        raise ValueError("Insufficient stock")
    
    # Optional min stock rule 
    if product.min_stock and (product.stock_quantity - quantity) < product.min_stock:
        raise ValueError("Stock level would fall below minimum stock level")
    
    product.stock_quantity -= quantity
    stock_movement = StockMovement(
        product_id=product_id,
        quantity=quantity,
        movement_type='OUT',
        reference=reference,
        user_id=user_id
    )
    db.add(stock_movement)
    db.commit()
    db.refresh(product)
    db.refresh(stock_movement)
    audit_service.log_action(db, user_id, f'Stocked out {quantity} units of product ID {product_id}')
    return product

#-------------------------------------
# Get Stock Level
#-------------------------------------
def get_stock_level(db: Session, product_id: int):
    """Get the current stock level for a specific product."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise ValueError("Product not found")
    return product.stock_quantity

#-------------------------------------
# Low Stock Alerts 
#------------------------------------
def low_stock_alerts(db: Session, threshold: int = 10):
    """
    Return product below threshold stock level.
    """
    low_stock_products = db.query(Product).filter(Product.stock_quantity < threshold).all()
    return low_stock_products

#-------------------------------------
# Stock Movement History
#-------------------------------------
def stock_movement_history(db: Session, product_id: int):
    """Retrieve stock movement history for a specific product."""
    movements = db.query(StockMovement).filter(StockMovement.product_id == product_id).order_by(StockMovement.timestamp.desc()).all()
    return movements


