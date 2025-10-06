#app/api/endpoints/sale_order_item_router.py

from fastapi import APIRouter, Depends, HTTPException, Query, Status, Response
from sqlalchemy.orm import Session
from typing import List 

from app.schemas.sale_order_item import SaleOrderItemCreate, SaleOrderItemUpdate, SaleOrderItemRead 
from app.models.sale_order_item import SaleOderItemService
from app.db.session import get_db 

router = APIRouter(prefix="/sale-order-items", tags=["Sale Order Item"])

@router.get("/", response_model=SaleOrderItemRead, summary="Get a list sale order items")
def list_order_items(
        skip: int = Query(0, ge=0, description="Number of records to skip"),
        limit: int = Query(10, le=100, description="Maximum number of records to return"),
        db: Session = Depends(get_db)
    ):
    return SaleOderItemService(db).get_all_order_items(skip=skip, limit=limit)

@router.get("/{item_id}", response_model=SaleOrderItemRead, summary="Get a single sale order item")
def read_order_item(
        item_id: int, 
        db: Session = Depends(get_db)
    ):
    return SaleOderItemService(db).get_order_item_by_id(item_id)

@router.post("/", response_model=SaleOrderItemRead, status_code=status.HTTP_201_CREATED,summary="Create a new sale order item")
def create_order_item(
        order_item_data: SaleOrderItemCreate,
        db: Session = Depends(get_db)
    ):
    return SaleOderItemService(db).create_order_item(order_item_data)

@router.put("/{item_id}", response_model=SaleOrderItemRead, summary="Update an existing sale order item")
def update_order_item(
        item_id: int,
        updated_order_item: SaleOrderItemUpdate,
        db: Session = Depends(get_db)
    ):
    order_item = SaleOderItemService(db).update_order_item(item_id, updated_order_item)
    if not order_item:
        raise HTTPException(status_code=404, detail="Sale order not found")
    return order_item

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete a Sale order item")
def delete_order_item(
        item_id: int,
        db: Session = Depends(get_db)
    ):
    order_item = SaleOderItemService(db).delete_order_item(item_id)
    if not order_item:
        raise HTTPException(status_code=404, detail="Sale order item not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

