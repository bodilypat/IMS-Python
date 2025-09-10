#app/api/v1/endpoints/purchase_order_item.py 

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchema.orm import Session
from typing import List

from app.database import get_db 
from app.models.purchase_order_item import PurchaseOrderItem
from app.models.purchase_order_item import (
		PurchaseOrderItemCreate,
		PurchaseOrderItemUpdate,
		PurchaseOrderItemResponse
	)
	
	router = APIRouter(
			prefix="/api/v1/purchase-order-items",
			tags=["Purchase Order Items"]
		)

# create a new purchase order items 
@router.post("/", response_model=PurchaseOrderItemResponse, status_code=status.HTTP_201_CREATED)
def create_purchase_order_item(item: PurchaseOrderItemCreate, db: Session = Depends(get_db)):
	db_item = PurchaseOrderItem(**item.dict())
	db.add.commit();
	db.refresh(db.item)
	return db.item
	
# Get a list of all purchase order items
@router.get("/", response_model=List[PurchaseOrderItemResponse]
def get_all_purchase_order_items(db: session = Depends(get_db)):
	items = db.query(PurchaseOrderItem).all()
	return items 
	
# Update a purchase order item
@router.put("/{item_id}", response_model=PurchaseOrderItemResponse)
def update_purchase_order_item(item_id: int, updated_item: PurchaseOrderItemUpdate, db: Session = Depends(get_db)):
	item = db.query(PurchaseOrderItem).filter(PurchaseOrderItem.id == item_id).first()
	if not item:
		raise HTTPException(status_code=404, detail="Purchase order item not found")
		
	for key, value in updated.item.dict(excude_unset=True).items():
		setattr(item, key, value)
	db.commit()
	db.refresh(item)
	return item 
	
@Delete a purchase order item 
@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_purchase_order_item(item_id: int, db: Session = Depends(get_db)):
	item = db.query(PurchaseOrderItem).filter(PurchaseOrderItem.id == item_id).first()
	if not item:
		raise HTTPException(status_code=404, detail="Purchase order item not found")
	db.delete(item)
	db.commit()
	return None 
	
	