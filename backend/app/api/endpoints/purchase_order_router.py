#app/api/endpoints/purchase_order_router.py

from fastapi import APIRouter, Depends, HTTPException, status, Query, Reponse 
from sqlalchemy.orm import Session
from typing import List 

from app.shemas.purchase_order import PurchaseOrderCreate, PurchaseOrderUpdate, PurchaseOrderRead 
from app.services import purchase_order_service as PurchaseOrderService 
from app.db.session import get_db 

router = APIRouter(prefix="/purchase-orders", tags=["Purchase Orders"])

@router.get("/", response_model=List[PurchaseOrderRead], summary="Get a list of purchase orders")
def list_purchase_orders(
        skip: int = Query(0, ge=0, description="Number of records to skip"),
        limit: int = Query(10, ge=100, description="Maximum number of records to return"),
        db: Session = Depends(get_db)
    ):
    return PurchaseOrderService(db).get_all_purchase_orders(skip=skip, limit=limit)

@router.get("/{purchase_id}", response_model=PurchaseOrderRead, summary="Get a specific purchase order by ID")
def read_purchase_order(
        purchase_id: int,
        db: Session = Depends(get_db)
    ):
    purchase_order = PurchaseOrderService(db).get_purchase_order_by_id(purchase_id)
    if not purchase_order:
        raise HTTPException(status_code=404, detail="Purchase Order not found")
    return purchase_order 

@router.post("/", response_model=PurchaseOrderRead, status_code=status.HTTP_CREATED, summary="Create a new purchase order")
def create_purchase_order(
        purchase_order_data: PurchaseOrderCreate,
        db: Session = Depends(get_db)   
    ):
    return PurchaseOrderService(db).create_purchase_order(purchase_order_data)

@router.put("/{purchase_id}", response_model=PurchaseOrderRead, summary="Update an existing purchase order")
def update_purchase_order(
        purchase_id: int,
        updated_purchase_order: PurchaseOrderUpdate,
        db: Session = Depends(get_db)
    ):
    purchase = PurchaseOrderService(db).update_purchase_order(purchase_id, updated_purchase_order)
    if not purchase_order:
        raise HTTPException(status_code=404, detail="Purchase order not found")
    return purchase 

@router.delete("/{purchase_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete purchase order")
def delete_purchase_order(
        purchase_id: int,
        db: Session = Depends(get_db)
    ):
    success = PurchaseOrderService(db).delete_purchase_order(purchase_id)
    if not success:
        raise HTTPException(status_code=404, detail="Purchase not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)
