#app/services/stock_service.py

from sqlalchemy.orm import Session
from app.models.product import Product
from app.models.stock import StockMovement
from app.services import audit_service
from typing import List

MOVEMENT_IN = 'IN'
MOVEMENT_OUT = 'OUT'

#----------------------------------------------
# Stock In
#----------------------------------------------
def stock_in(db: Session, product_id: int, quantity: int, user_id: int) -> Product:
    """
    Increase stock quantity for a product and log the stock movement.
    """

    if quantity <= 0:
        raise ValueError("Quantity must be greater than zero")
    

    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise ValueError("Product not found")

    product.stock.quantity += quantity
    stock_movement = StockMovement(
        product_id=product_id,
        quantity=quantity,
        movement_type=MOVEMENT_IN,
        user_id=user_id
    )

    db.add(stock_movement)
    product.stock_quantity += quantity
    db.commit()
    db.refresh(stock_movement)

    audit_service.log_action(db, user_id, f'Stocked in {quantity} units of product ID {product_id}')

    return stock_movement

#----------------------------------------------
# Stock Out
#----------------------------------------------
def stock_out(db: Session, product_id: int, quantity: int, user_id: int, reference: str = None) -> Product:
    """
    Remove stock from inventory with validation.
    """

    if quantity <= 0:
        raise ValueError("Quantity must be greater than zero")

    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise ValueError("Product not found")

    if product.stock.quantity < quantity:
        raise ValueError("Insufficient stock quantity")
    
    if product.min_stock is not None and(product.stock.quantity - quantity) < product.min_stock:
        raise ValueError("Stock quantity cannot go below minimum stock level")

    product.stock.quantity -= quantity
    stock_movement = StockMovement(
        product_id=product_id,
        quantity=quantity,
        movement_type=MOVEMENT_OUT,
        user_id=user_id,
        reference=reference
    )

    db.add(stock_movement)
    product.stock_quantity -= quantity
    db.commit()
    db.refresh(product)
    db.refresh(stock_movement)

    audit_service.log_action(db, user_id, f'Stocked out {quantity} units of product ID {product_id}')
    return stock_movement

#----------------------------------------------
# Get Stock Level
#----------------------------------------------
def get_stock_level(db: Session, product_id: int) -> int:
    """
    Retrieve the current stock level for a specific product.
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise ValueError("Product not found")
    
    return product.stock.quantity

#----------------------------------------------
# Low Stock Alert 
#----------------------------------------------
def low_stock_alert(db: Session, threshold: int = 10) -> List[Product]:
    """
    Retrieve a list of products that are below their minimum stock level.
    """
    low_stock_products = db.query(Product).filter(
        Product.min_stock.isnot(None),
        Product.stock.quantity < Product.min_stock
    ).all()
    
    return low_stock_products

#----------------------------------------------
# Stock Movement History
#----------------------------------------------
def stock_movement_history(db: Session, product_id: int) -> List[StockMovement]:
    """
    Retrieve the stock movement history for a specific product.
    """
    movements = db.query(StockMovement).filter(StockMovement.product_id == product_id).order_by(StockMovement.timestamp.desc()).all()
    return movements
