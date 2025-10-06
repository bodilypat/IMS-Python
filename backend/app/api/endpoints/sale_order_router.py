#app/api/endpoints/sale_order.py

from fastapi import APIRouter, Depends, HTTPException, Query, status, Response
from sqlalchemy.orm import Session
from typing import List 

from app.schemas.sale_order import SaleOrderCreate, SaleOrderUpdate, SaleOrderRead 
from app.services.sale_order_service import SaleOrderService 
from app.db.session import get_db 

router = APIRouter(prefix"/sale-orders", tags=["Sale Orders"])

@router.get("/", response_model=List[SaleOrderRead], summary="Get a list of sale orders")
def list_sale_order(
        skip: int = Query(0, ge=0, description="Number of records to skip"),
        limit: int = query(10, le=100, description="MAximum number of records to return"),
        db: Session = Depends(get_db)
    ):
    return SaleOrderService(db).get_all_sale_orders(skip=skip, limit=limit)

@router.get("/{sale_id}", response_model=SaleOrderRead, summary="Get a single sale order")
def read_sale_order(
        sale_id: int,
        db: Session = Depends(get_db)
    ):
    sale_order = SaleOrderService(db).get_sale_order_by_id(sale_id)

    if not sale_order:
        raise HTTPException(status_code=404, detail="Sale order not found")
    return sale_order 

@router.post("/", response_model=SaleOrderRead, status_code=status.HTTP_201_CREATED, summary="Create a new Sale Orders")
def create_sale_order(
        order_data: SaleOrderCreate,
        db: Session = Depends(get_db)
    ):
    return SaleOrderService(db).get_create_sale_order(order_data)

@router.put("/{sale_id}", response_model=SaleOrderRead, summary="Update an existing Sale Order")
def update_sale_order(
        sale_id: int,
        updated_order: SaleOrderUpdate,
        db: Session = Depends(get_db)
    ):
    sale_order = SaleOrderService(db).update_sale_order(sale_id, updated_order)

    if not sale_order:
        raise HTTPException(status_code=404, detail="Sale order not found")
    return sale_order 

@router.delete("/{sale_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete sale order")
def delete_sale_order(
        sale_id: int,
        db: Session = Depends(get_db)
    ):

    success = SaleOrderService(db).delete_sale_order(sale_id)
    if not success:
        raise HTTPException(status_code=404, detail="Sale order not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

