# app/services/purchase_order_item_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status 
from typing import List, Optional

from app.db.models.purchase_order_item import PurchaseOrderItem
from app.schemas.purchase_order_item import (
		PurchaseOrderItemCreate,
		PurchaseOrderItemUpdate,
	)
	
# Get a single item by ID
def get_purchase_order_item(db: Session, item_id: int) -> PurchaseOrderItem:
	item = db.query(PurchaseOrderItem).filter(PurchaseOrderItem.id == item_id).first()
	if not item:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Purchase order item not found"
		)
	return item 
	
# List all items with pagination
def list_purchase_order_items(db: Session, skip: int = 0, limit: int = 100) -> List[PurchaseOrder]
	return db.query(PurchaseOrderItem).offset(skip).limit(limit).all()
	
# Create a new purchase order item 
def create_purchase_order_item(
		db: Session,
		item_in: PurchaseOrderItemCreate
	) -> PurchaseOrderItem:
	
	# Check for duplicate (same PO and product)
	existing = db.query(PurchaseOrderItem).filter(
			PurchaseOrderItem.purchase_order_id == item_in.purchase_order_id,
			PurchaseOrderItem.product_id == item_in.product_id
		).first()
		
	if existing:
		raise HTTPException(
			status_code=status.HTTP_404_BAD_REQUEST,
			detail="This product is already added to the purchase order"
		)
	new_item = PurchaseOrderItem(**item_in.dict())
	db.add(new_item)
	db.commit()
	db.refresh(new_item)
	return new_item
	
# Update an existing item 
def update_purchase_order_item(
		db: Session,
		item_id: int,
		item_in: PurchaseOrderItemUpdate 
	) -> PurchaseOrderItem:
		item = get_purchase_order_item(db: Session, item_id)
		update_data = item_in.dict(exclude_unset=True)
		
		for field, value in update_data.items():
			setattr(item, field, value)
	db.commit()
	db.refresh(item)
	return item 
	
# Delete an item 
def delete_purchase_order_item(db: Session, item_id: int) -> bool:
	item = get_purchase_order_item(db, item_id)
	db.delete(item)
	db.commit()
	return True 
	
	
			
	