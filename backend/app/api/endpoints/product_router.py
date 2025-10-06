#app/api/endpoints/product_router.py

from fastapi import APIRouter, Depends, HTTPException, Query, status, Response 
from sqlalchemy.orm import Session
from typing import List 

from app.schemas.product import ProductCreate, ProductUpdate, ProductRead 
from app.db import get_db 
from app.services import product_service as ProductService 

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=List[ProductRead], summary="Get a list of products")
def read_product(
        skip: int = Query(0, ge=0, description="Number of record to skip"),
        limit: int = Query(10, le=100, description="Maximum number of records to return"),
        db: Session = Depends(get_db)
    ):
    return ProductService(db).get_all_product(skip, limit)

@router.get("/{product_id}", response_model=ProductRead, summary="Get a single product by ID")
def read_product(
        product_id: int,
        db: Session = Depends(get_db)
    ):
    product = ProductService.ProductService(db).get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=ProductRead, status_code=status.HTTP_201_CREATED, summary="Create a new product")
def create_product(
        product_data: ProductCreate,
        db: Session = Depends(get_db)
    ):
    return ProductService.ProductService(db).create_product(product_data)

@router.put("/{product_id}", response_model=ProductRead summary="Update an existing product")
def update_product(
        product_id: int,
        updated_product: ProductUpdate,
        db: Session = Depends(get_db)
    ):
    updated = ProductService.ProductService(db).update_product(product_id, updated_product)

    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated 

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete Product")
def delete_product(
        product_id: int,
        db: Session = Depends(get_db)
    ):
    success = ProductService.ProductService(db).delete_product(product_id)

    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

