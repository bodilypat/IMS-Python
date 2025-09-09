#app/api/v1/endpoints/purchase_order_api.py

from fastapi import APIRouter, Depends, HTTPException, status, Query 
from sqlalchemy.orm import Session
from typing import List, Optional

from app.schemas.purchase_order_schema import (
		PurchaseOrderCreate,
		PurchaseOrderRead,
		PurchaseOrderStatus 
	)
from app.services.purchase_order_service import (
		create_purchase_order,
		get_all_purchase_order,
		get_purchase_order_by_id,
		update_purchase_order_status,
		delete_purchase_order
	)
from app.dependancies import get_db 

router = APIRouter(
		prefix="/purchase-roders",
		tags=["Purchase Orders"]
	)
	
# Create a new purchase order 
@router.post("/", response_model=PurchaseOrderRead, status_code=status.HTTP_201_CREATED)
def create_order(
		order_data: PurchaseOrderCreate,
		db: Session = Depends(get_db)
	):
	return create_purchase_order(db=db, order_data=order_data)
	
# List all purchase orders, with optional filter 
@router.get("/", response_model=List[PurchaseOrderRead])
def list_orders(
        status: Optional[str] = Query(None, description="Filter by status"),
        db: Session = Depends(get_db)
    ):
        return get_all_purchase_orders(db=db, status=status, supplier_id=supplier_id)
        
# Get a purchase order by ID
@router.get("/{order_id}", response_model=PurchaseOrderRead)
def get_order_by_id(
        order_id: int,
        db: Session = Depends(get_db)
    ):
        order = get_purchase_order_by_id(db=db, order_id=order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Purchase order not found")
        return order 
        
# Update the status of a purchase order 
@router.patch("/{order_id}/status", response_model=PurchaseOrderRead)
def update_status(
        order_id: int,
        status_data: PurchaseOrderStatus,
        db: Session = Depends(get_db)
    ):
        updated_order = update_purchase_order_status(db=db, order_id=order_id, new_status=status_data.status)
        if not updated_order:
            raise HTTPException(status_code=404, detail="Purchase order not found")
        return updated_order 
        
# Delete a purchase order
@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(
        order_id: int,
        db: Session = Depends(get_db)
    ):
        deleted = deleted_purchase_order(db=db, order_id=order_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Purchase order not found")
        return 
        
        
             

#get a purchase order by ID 
@router.get("/{order_id}", 