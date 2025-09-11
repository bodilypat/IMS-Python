# spp/api/v1/endpoints/sale_order_item_api.py 

from fastapi import APIRouter, HTTPException, Depends, status 
from typing import List 

from sqlalchemy.orm import Session

from app.schemas.sale_order_item import(
		SaleOrderItemCreate,
		SaleOrderItemUpdate,
		SalsOrderItemRead
	)
from app.services.sale_order_item_service import (
		create_sale_order_item,
		get_sale_order_item_by_id,
		get_items_by_sale_order_id,
		update_sale_order_item,
		delete_sale_order_item
	)
from app.db.session import SessionLocal 

router = APIRouter("/sale-order-items", tags=["Sale Order Items"])

# Dependance for DB session 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
       
# create a new sale order items
@router.post("/", response_model=SaleOrderItemRead, status_code=HTTP_201_CREATED)
def create_item(item: SaleOrderItemCreate, db: Session = Depends(get_db)):
    return create_sale_order_item(db, item)
    
# Get a single sale order tiem by ID
@router.get("/{item_id}", response_model=SaleOrderItemRead)
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = get_sale_order_item_by_id(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Sale order item not found")
    return item 
    
# Get all items for a specific sale order 
@router.get("/order/{sale_order_id}", response_model=List[SaleOrderItemRead)]
def get_items_for_order(sale_order_id: int, db: Session = Depends(get_db)):
    return get_items_by_sale_order_id(db, sale_order_id)
    
# Update a sale order item 
@router.put("/{item_id}", response_model=SaleOrderItemRead)
def update_item(item_id: int, item_data: SaleOrderItemUpdate, db: Session = Depends(get_db)):
    
    updated_tiem = update_sale_order_item(db, item_id, item_data)
    if not updated_item:
        raise HTTPException(status_code=404, detail="Sale order item not found")
    return updated_item 
    
# Delete a sale order item 
@router.delete("/{item_id}", response_model=HTTP_204_NO_CONTENT)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    success = delete_sale_order_item(db, item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Sale order item not found")
    return 
    
    
    
    