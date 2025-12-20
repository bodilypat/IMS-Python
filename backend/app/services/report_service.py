#app/services/report_service.py

from sqlalchemy.orm import Session
from sqlalchemy import func, case 
from datetime import datetime
from app.models.product import Product
from app.models.order import StockMovement 

MOVEMENT_IN = 'IN'
MOVEMENT_OUT = 'OUT'

def stock_in_sum():
    return func.sum(
        case(
            [(StockMovement.movement_type == MOVEMENT_IN, StockMovement.quantity)],
            else_=0
        )
    )

def stock_out_sum():
    return func.sum(
        case(
            [(StockMovement.movement_type == MOVEMENT_OUT, StockMovement.quantity)],
            else_=0
        )
    )

#-------------------------------------------
# Inventory Summary
#-------------------------------------------
def get_inventory_summary(db: Session, start_date: datetime = None, end_date: datetime = None):
    return (
        db.query(
            Product.id.label('product_id'),
            Product.name.label('product_name'),
            stock_in_sum().label('total_stock_in'),
            stock_out_sum().label('total_stock_out'),
            (stock_in_sum() - stock_out_sum()).label('current_stock')
        )
        .join(StockMovement, StockMovement.product_id == Product.id)
        .filter(
            (start_date is None or StockMovement.movement_date >= start_date) &
            (end_date is None or StockMovement.movement_date <= end_date)
        )
        .group_by(Product.id)
        .all()  
    )

#-------------------------------------------
# Low Stock Report
#-------------------------------------------
def stock_movement_report(db: session, product_id: int, start_date: datetime, end_date: datetime):
    return (
        db.query(
            StockMovement.product_id,
            stock_in_sum().label('total_stock_in'),
            stock_out_sum().label('total_stock_out')
        )
        .filter(
            StockMovement.product_id == product_id,
            StockMovement.movement_date >= start_date,
            StockMovement.movement_date <= end_date
        )
        .order_by(StockMovement.movement_date)
        .all()
    )

#-------------------------------------------
# Top Moving Products 
#-------------------------------------------
def top_moving_products(db: Session, limit: int = 10):
    return (
        db.query(
            Product.id.label('product_id'),
            Product.name.label('product_name'),
            stock_out_sum().label('total_sold')
        )
        .join(StockMovement, StockMovement.product_id == Product.id)
        .filter(StockMovement.movement_type == MOVEMENT_OUT)
        .group_by(Product.id)
        .order_by(func.sum(StockMovement.quantity).desc())
        .limit(limit)
        .all()  
    )

#-------------------------------------------
# Stock Valuation Report 
#-------------------------------------------
def stock_valuation_report(db: Session):
    current_stock = stock_in_sum() - stock_out_sum()

    return (
        db.query(
            Product.id.label('product_id'),
            Product.name.label('product_name'),
            current_stock.label('current_stock'),
            (Product.unit_price * current_stock).label('stock_valuation')
        )
        .join(StockMovement, StockMovement.product_id == Product.id)
        .group_by(Product.id)
        .all()  
    )

#-------------------------------------------
# Daily Stock Movement Report
#-------------------------------------------
def daily_stock_movement_report(db: Session, report_date: datetime):
    return (
        db.query(
            Product.id.label('product_id'),
            Product.name.label('product_name'),
            stock_in_sum().label('total_stock_in'),
            stock_out_sum().label('total_stock_out')
        )
        .join(StockMovement, StockMovement.product_id == Product.id)
        .filter(
            func.date(StockMovement.movement_date) == report_date.date()
        )
        .group_by(StockMovement.product_id)
        .all()
    )

#-------------------------------------------
# Monthly Stock Movement 
#-------------------------------------------
def monthly_stock_movement_report(db: Session, year: int, month: int):
    return (
        db.query(
            Product.id.label('product_id'),
            Product.name.label('product_name'),
            stock_in_sum().label('total_stock_in'),
            stock_out_sum().label('total_stock_out')
        )
        .join(StockMovement, StockMovement.product_id == Product.id)
        .filter(
            func.extract('year', StockMovement.movement_date) == year,
            func.extract('month', StockMovement.movement_date) == month
        )
        .group_by(StockMovement.product_id)
        .all()
    )

#-------------------------------------------
# Yearly Stock Movement
#-------------------------------------------
def yearly_stock_movement_report(db: Session, year: int):
    return (
        db.query(
            Product.id.label('product_id'),
            Product.name.label('product_name'),
            stock_in_sum().label('total_stock_in'),
            stock_out_sum().label('total_stock_out')
        )
        .join(StockMovement, StockMovement.product_id == Product.id)
        .filter(
            func.extract('year', StockMovement.movement_date) == year
        )
        .group_by(StockMovement.product_id)
        .all()
    )

