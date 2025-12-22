#app/api/endpoints/reports.py

from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, get_current_user
from app.models.user import User
from app.models.report import (
    InventorySummaryReport,
    StockMovementReportResponse,
    TopMovingProductsReport,
    DailySalesReport,
)
from app.services.report_service import (
    get_inventory_summary,
    stock_movement_report,
    top_moving_products,
    daily_sales_report,
    monthly_sales_report,
    yearly_sales_report,
)

router = APIRouter(prefix="/reports", tags=["reports"])
#---------------------------------
# Inventory Summary Report
#---------------------------------
@router.get(
    "/inventory-summary", 
    response_model=List[InventorySummaryReport]
)
def inventory_summary_report(
    start_date: Optional[datetime] = Query(None, description="Start date for the report"),
    end_date: Optional[datetime] = Query(None, description="End date for the report"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Generate an inventory summary report.
    """
    report = get_inventory_summary(db, start_date, end_date)
    return report

#---------------------------------------------
# Stock Movement Report (In/Out) Product-wise
#---------------------------------------------
@router.get(
    "/stock-movement/{product_id}", 
    response_model=List[StockMovementReportResponse]
)
def product_stock_movement(
    product_id: int,
    start_date: Optional[datetime] = Query(None, description="Start date for the report"),
    end_date: Optional[datetime] = Query(None, description="End date for the report"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Generate a stock movement report for a specific product.
    """
    report = stock_movement_report(db, product_id, start_date, end_date)
    return report

#--------------------------------------
# Top Moving Products 
#--------------------------------------
@router.get(
    "/top-moving-products", 
    response_model=List[TopMovingProductsReport]
)
def top_moving_products (
    start_date: Optional[datetime] = Query(None, description="Start date for the report"),
    end_date: Optional[datetime] = Query(None, description="End date for the report"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Generate a top moving products report.
    """
    report = top_moving_products(db, start_date, end_date)
    return report

#--------------------------------------
# Daily Sales Report
#--------------------------------------
@router.get(
    "/daily-sales", 
    response_model=List[DailySalesReport]
)
def daily_sales_report(
    start_date: Optional[datetime] = Query(None, description="Start date for the report"),
    end_date: Optional[datetime] = Query(None, description="End date for the report"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Generate a daily sales report.
    """
    report = daily_sales_report(db, start_date, end_date)
    return report   

#--------------------------------------
# Monthly Sales Report
#--------------------------------------
@router.get(
    "/monthly-sales", 
    response_model=List[DailySalesReport]
)
def monthly_sales_report(
    start_date: Optional[datetime] = Query(None, description="Start date for the report"),
    end_date: Optional[datetime] = Query(None, description="End date for the report"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Generate a monthly sales report.
    """
    report = monthly_sales_report(db, start_date, end_date)
    return report

#--------------------------------------
# Yearly Sales Report
#--------------------------------------
@router.get(
    "/yearly-sales", 
    response_model=List[DailySalesReport]
)
def yearly_sales_report(
    start_date: Optional[datetime] = Query(None, description="Start date for the report"),
    end_date: Optional[datetime] = Query(None, description="End date for the report"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Generate a yearly sales report.
    """
    report = yearly_sales_report(db, start_date, end_date)
    return report

