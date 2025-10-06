#app/api/endpoints/purchase_order_item.py

from fastapi import APIRouter, Depends, HTTPException, status, Query, Response 
from salalchemy.orm import Session 
from typing import List  

from app.schemas.purchase_order_items import PurchaseOrderItemCreate, PurchaseOrderItemRead, PurchaseOrderItemUpdate 
from app.services import purchase_order_item_service as PurchaseOrderItemService
from app.db.session import get_db 

router = APIRouter(prefix="/purchase-order-items", tags=["Purchase Order Item"])

@router.get("/", response_model=List[PurchaseOrderItemRead], summary="Get a list of Purchase order items")
def list_items(
        skip: int = Query(0, ge=0, description="number of records to skip"),
        limit: int = Query(10, le=100, description="Maximum number of records to return"),
        db: Session = Depends(get_db)
    ):
    return PurchaseOrderItemService(db).get_all_items(skip=skip, limit=limit)

@router.get("/{item_id}", response_model=PurchaseOrderItemRead, summary="Get a single purchase order item by ID")
def read_item(
        item_id: int,
        db: Session = Depends(get_db)
    ):
    item = PurchaseOrderItemService(db).get_item_by_id(item_id)

    if not item:
        raise HTTPException(status_code=404, detail="Purchase order item not found")
    return item 

@router.post("/", response_model=PurchaseOrderItemRead, status_code=status.HTTP_201_CREATED, summary="Create a new purchase order item")
def create_item(
        order_item_data: PurchaseOrderItemCreate,
        db: Session = Depends(get_db)
    ):
    return PurchaseOrderItemService(db).create_items(order_item_data)

@router.put("/{item_id}", response_model=PurchaseOrderItemRead, summary="Update an existing purchase order item")
def update_item(
        item_id: int,
        updated_order_item: PurchaseOrderItemUpdate,
        db: Session = Depends(get_db)
    ):
    order_item = PurchaseOrderItemService(db).update_item(item_id, updated_order_item)

    if not order_item:
        raise HTTPException(status_code=404, detail="Purchase order not found")
    return order_item

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete purchase order item")
def delete_item(
        item_id: int ,
        db: Session = Depends(get_db)
    ):
    purchase_order_item = PurchaseOrderItemService(db).delete_item(item_id)
    if not purchase_order_item:
        raise HTTPException(status_code=404, detail="Purchase order item not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)