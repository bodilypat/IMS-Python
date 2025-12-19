#app/services/report_service.py

from sqlalchemy.orm import Session
from sqlalchemy import func, case
from app.models.product import Product
from app.models.stock import StockMovement
from datetime import datetime

#-------------------------------------
# Inventory Summary 
#-------------------------------------
def generate_inventory_summary(db: Session, start_date: datetime, end_date: datetime):
    summary = db.query(
        Product.id.label('product_id'),
        Product.name.label('product_name'),
        func.sum(
            case(
                [(StockMovement.movement_type == 'in', StockMovement.quantity)],
                else_=0
            )
        ).label('total_stock_in'),
        func.sum(
            case(
                [(StockMovement.movement_type == 'out', StockMovement.quantity)],
                else_=0
            )
        ).label('total_stock_out'),
        (func.sum(
            case(
                [(StockMovement.movement_type == 'in', StockMovement.quantity)],
                else_=0
            )
        ) - func.sum(
            case(
                [(StockMovement.movement_type == 'out', StockMovement.quantity)],
                else_=0
            )
        )).label('net_stock_change')
    ).join(StockMovement, Product.id == StockMovement.product_id
    ).filter(
        StockMovement.date >= start_date,
        StockMovement.date <= end_date
    ).group_by(Product.id).all()

    return summary

#-------------------------------------
# Low Stack Report 
#-------------------------------------
def generate_low_stock_report(db: Session, threshold: int):
    low_stock_products = db.query(
        Product.id.label('product_id'),
        Product.name.label('product_name'),
        func.sum(
            case(
                [(StockMovement.movement_type == 'in', StockMovement.quantity)],
                else_=0
            )
        ).label('total_stock_in'),
        func.sum(
            case(
                [(StockMovement.movement_type == 'out', StockMovement.quantity)],
                else_=0
            )
        ).label('total_stock_out'),
        (func.sum(
            case(
                [(StockMovement.movement_type == 'in', StockMovement.quantity)],
                else_=0
            )
        ) - func.sum(
            case(
                [(StockMovement.movement_type == 'out', StockMovement.quantity)],
                else_=0
            )
        )).label('current_stock')
    ).join(StockMovement, Product.id == StockMovement.product_id
    ).group_by(Product.id
    ).having(
        (func.sum(
            case(
                [(StockMovement.movement_type == 'in', StockMovement.quantity)],
                else_=0
            )
        ) - func.sum(
            case(
                [(StockMovement.movement_type == 'out', StockMovement.quantity)],
                else_=0
            )
        )) < threshold
    ).all()

    return low_stock_products   

#-------------------------------------
# Stock Movement Report
#-------------------------------------
def stock_movement_report(
    db: Session, 
    product_id: int, 
    start_date: datetime, 
    end_date: datetime
):
    movements = (
        db.query(
            StockMovement.product_id,
            func.sum(
                case(
                    [(StockMovement.movement_type == 'in', StockMovement.quantity)],
                    else_=0
                )
            ).label('total_stock_in'),
            func.sum(
                case(
                    [(StockMovement.movement_type == 'out', StockMovement.quantity)],
                    else_=0
                )
            ).label('total_stock_out')
        ).filter(
            StockMovement.product_id == product_id, 
            StockMovement.date >= start_date,
            StockMovement.date <= end_date
        ).group_by(StockMovement.product_id).all()
    return movements
#-------------------------------------
# Top product by Stock Usage
#-------------------------------------
def top_moving_products(db: Session, limit: int = 10):
    top_products = db.query(
        Product.id.label('product_id'),
        Product.name.label('product_name'),
        func.sum(
            case(
                [(StockMovement.movement_type == 'out', StockMovement.quantity)],
                else_=0
            )
        ).label('total_stock_out')
    ).join(StockMovement, Product.id == StockMovement.product_id
    ).group_by(Product.id
    ).order_by(func.sum(
        case(
            [(StockMovement.movement_type == 'out', StockMovement.quantity)],
            else_=0
        )
    ).desc()
    ).limit(limit).all()

    return top_products

#-------------------------------------
# Stock Valuation Report
#-------------------------------------
def stock_valuation(db: Session):
    valuation = db.query(
        Product.id.label('product_id'),
        Product.name.label('product_name'),
        (func.sum(
            case(
                [(StockMovement.movement_type == 'in', StockMovement.quantity)],
                else_=0
            )
        ) - func.sum(
            case(
                [(StockMovement.movement_type == 'out', StockMovement.quantity)],
                else_=0
            )
        )).label('current_stock'),
        (Product.unit_price * (
            func.sum(
                case(
                    [(StockMovement.movement_type == 'in', StockMovement.quantity)],
                    else_=0
                )
            ) - func.sum(
                case(
                    [(StockMovement.movement_type == 'out', StockMovement.quantity)],
                    else_=0
                )
            )
        )).label('total_valuation')
    ).join(StockMovement, Product.id == StockMovement.product_id
    ).group_by(Product.id).all()

    return valuation

#-------------------------------------
# Daily Stock Movement Report
#-------------------------------------
def daily_stock_movement(db: Session, date: datetime):
    daily_movements = db.query(
        Product.id.label('product_id'),
        Product.name.label('product_name'),
        func.sum(
            case(
                [(StockMovement.movement_type == 'in', StockMovement.quantity)],
                else_=0
            )
        ).label('total_stock_in'),
        func.sum(
            case(
                [(StockMovement.movement_type == 'out', StockMovement.quantity)],
                else_=0
            )
        ).label('total_stock_out')
    ).join(StockMovement, Product.id == StockMovement.product_id
    ).filter(
        func.date(StockMovement.date) == date.date()
    ).group_by(Product.id).all()

    return daily_movements

#-------------------------------------
# Monthly Stock Movement Report
#-------------------------------------
def monthly_stock_movement(db: Session, year: int, month: int):
    monthly_movements = db.query(
        Product.id.label('product_id'),
        Product.name.label('product_name'),
        func.sum(
            case(
                [(StockMovement.movement_type == 'in', StockMovement.quantity)],
                else_=0
            )
        ).label('total_stock_in'),
        func.sum(
            case(
                [(StockMovement.movement_type == 'out', StockMovement.quantity)],
                else_=0
            )
        ).label('total_stock_out')
    ).join(StockMovement, Product.id == StockMovement.product_id
    ).filter(
        func.extract('year', StockMovement.date) == year,
        func.extract('month', StockMovement.date) == month
    ).group_by(Product.id).all()

    return monthly_movements

#-------------------------------------
# Yearly Stock Movement Report
#-------------------------------------
def yearly_stock_movement(db: Session, year: int):
    yearly_movements = db.query(
        Product.id.label('product_id'),
        Product.name.label('product_name'),
        func.sum(
            case(
                [(StockMovement.movement_type == 'in', StockMovement.quantity)],
                else_=0
            )
        ).label('total_stock_in'),
        func.sum(
            case(
                [(StockMovement.movement_type == 'out', StockMovement.quantity)],
                else_=0
            )
        ).label('total_stock_out')
    ).join(StockMovement, Product.id == StockMovement.product_id
    ).filter(
        func.extract('year', StockMovement.date) == year
    ).group_by(Product.id).all()

    return yearly_movements

#-------------------------------------

