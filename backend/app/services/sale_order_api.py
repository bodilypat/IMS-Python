# app/api/v1/endpoints/sale_order_api.py 

from fastapi import APIRouter, HTTPException, Depends, status 
from typing import List, Optional
from sqlalchemy.orm import Session

from app.schemas.sale_order import SaleOrderCreate, SaleOrderUpdate, SaleOrderRead 
from app.services.sale_order_service import(
		create_sale_order,
		get_sale_order_by_id,
		get_all_sale_orders,
		update_sale_order,
		soft_delete_sale_order,
	)
from app.db.session import SessionLocal

router = APIRouter(prefix="/sale-orders", tags=["Sale Orders"])

# Depends to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 

# Create a new sale order 
@router.post("/", response_model=SaleOrderRead, status_code=status.HTTP_201_CREATED)
def create_new_sale_order(order: SaleOrderCreate, db: Session = Depends(get_db)):
    return create_sale_order(db, order)
    
# Get all sale orders (Optionally filtered by status)
@router.get("/", response_model=List["SaleOrderRead"]
def list_sale_orders(status: Optional[str] = None, db: Session = Depends(get_db)):
    return get_all_sale_orders(db, status=status)
    
# Get a single sale order by ID
@router.get("/{sale_order_id}", response_model=SaleOrderRead)
def get_sale_order(sale_order_id: int, db: Session = Depends(get_db)):
    order = get_sale_order_by_id(db, sale_order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Sale order not found")
    return order 
    
# Update an existing sale order 
@router.put("/{sale_order_id}", respond_model=SaleOrderRead)
def update_existing_sale_order(
        sale_order_id: int,
        order_data: SaleOrderUpdate,
        db: Session = Depends(get_db)
    ):
        updated_order = update_sale_order(db, sale_order_id, order_data)
        if not updated_order:
            raise HTTPException(status_code=404, detail="Sale order not found")
        return updated_order

# soft-delete a sale order 
@router.delete("/{sale_order_id]",, status_code=status.HTTP_204_NO_CONTENT)
def delete_sale_order(sale_order_id: int , db: Session = Depends(get_db)):
    success = soft_delete_sale_order(db, sale_order_id)
    if not success:
        raise HTTPException(status_code=404, detail="Sale order not found or already deleted")
    return 
    
    

