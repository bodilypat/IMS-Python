#app/api/v1/endpoints/category_router.py

from fastapi import APIRouter, Depends, HTTPException, status, Query, Response 
from sqlalchemy.orm import Session 
from typing import List 

from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryRead 
from app.db.session import get_db
from app.services import category_service as CategoryService 

router = APIRouter()

@router.get("/", response_model=CategoryRead, summary="Get a list of categories")
def list_categories(
        skip: int = Query(0, ge=0),
        limit: int = Query(10, le=100),
        de: Session = Depends(get_db)
    ):
    return CategoryService(db).get_all_categories(skip, limit)

@router.get("/{category_id}", response_model=CategoryRead, summary="Get a single categor by ID")
def read_category(
        category_id: int,
        db: Session = Depends(get_db)
    ):
    category = CategoryService(db).get_category_by_id(category_id)
    if not category:
        raise HTTPException(status_code=404, detailt="Category not found")
    return category 

@router.post("/", response_model=CategoryRead, status_code=status.HTTP_201_CREATED, summary="Create Category")
def create_category(
        category_data: int,
        db: Session = Depends(get_db)
    ):
    category = CategoryService(db).create_category(category_data)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category 

@router.put("/{category_id}", response_model=CategoryRead, summary="Update an existing category")
def update_category(
        category_id: int,
        updated_category: CategoryUpdate,
        db: Session = Depends(get_db)
    ):
    updated = CategoryService(db).update_category(category_id, updated_category)
    if not updated:
        raise HTTPException(status_code=404, detail="Category not found")
    return updated
    
@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete category")
def delete_category(
        category_id: int,
        db: Session = Depends(get_db)
    ):
    success = CategoryService(db).delete_category(category_id)
    if not success:
        raise HTTPException(status_code=404, detail="Category not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

