#app/api/endpoints/stock_movement.py

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, get_current_user
from app.models.user import User
from app.models.stock import Stock
from app.schemas.stock import (
    StockInRequest,
    StockOutRequest,
    StockLevelOut,
    StockMovementOut,
)
from app.schemas.product import ProductOut
from app.services.stock_service import (
    stock_in,
    stock_out,
    get_stock_level,
    low_stock_alerts,
    stock_movement_history,
)

router = APIRouter(prefix="/stock", tags=["Stock"])

#--------------------------------------
# Stock In
#--------------------------------------
@router.post("/in", response_model=StockMovementOut)
def stock_in_product (
        data: StockInRequest,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user),
): 
    try:
        movement = stock_in(
            db=db,
            product_id=data.product_id,
            quantity=data.quantity,
            user_id=current_user.id,
        )
        return movement 
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    
#--------------------------------------
# Get Stock Level
#--------------------------------------
@router.get("/{product_id}/level", response_model=StockLevelOut)
def get_product_stock_level(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        movement = stock_out(
            db=db,
            product_id=data.product_id,
            quantity=data.quantity,
            user_id=current_user.id,
            refrence=data.reference,
        )
        return movement
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    
#-------------------------------------
# Get Stock Level
#-------------------------------------
@router.get("/{product_id}/level", response_model=StockLevelOut)
def get_product_stock_level(
    product_id: int,
    db: Session = Depends(get_db),
):
    try:
        quantity = get_stock_level(db, product_id)
        return quantity
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )
    
#-------------------------------------
# Low Stock Alerts
#-------------------------------------
@router.get("/low-stock", response_model=List[ProductOut])
def get_low_stock_products(
    threshold: int = 10,
    db: Session = Depends(get_db),
):
    return low_stock_alerts(db, threshold)

#-------------------------------------
# Stock Movement History
#-------------------------------------
@router.get(
    "{product_id}/movements", 
    response_model=List[StockMovementOut],
)
def get_product_stock_movements(
    product_id: int,
    db: Session = Depends(get_db),
):
    return stock_movement_history(db, product_id)

