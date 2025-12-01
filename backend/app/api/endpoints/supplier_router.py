#app/api/endpoints/supplier_router.py

from fastapi import APIRouter, Depends, HTTPException, status, Query, Response 
from sqlalchemy.orm import Session 
from typing import List 

from app.schema.supplier_schema import SupplierCreate, SupplierUpdate, SupplierRead 
from app.db.session import get_db 
from app.services.supplier_service import SupplierService 

router = APIRouter(prefix="/suppliers", tags=["Suppliers"])

# GET: List all suppliers
@router.get(
        "/", 
        response_model=List[SupplierRead], 
        summary="Get a list of suppliers"
)
def read_suppliers(
        skip: int = Query(0, ge=0, description="Number of records skip" ),
        limit: int = Query(10, le=100), description="Maximum number of records to return",
        db: Session = Depends(get_db)
    ):
    """ Retrieve a list of suppliers with pagination support."""
    service = SupplierService.SupplierService(db)
    return service.get_all_suppliers(skip, limit)

# GET: Get a single supplier by ID
@router.get(
        "/{supplier_id}", 
        response_model=SupplierRead, 
        summary="Get a single supplier"
    )
def read_supplier(
        supplier_id: int,
        db: Session = Depends(get_db)
    ):
    """ Retrieve a single supplier by its ID."""
    service = SupplierService.SupplierService(db)
    supplier = service.get_supplier_by_id(supplier_id)
    
    if not supplier:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Supplier not found"
        )
    return supplier 

# POST: Create a new supplier   
@router.post(
        "/", 
        response_model=SupplierRead, 
        status_code=status.HTTP_201_CREATED, 
        summary="Create a new supplier"
    )
def create_supplier(
        supplier_data: SupplierCreate,
        db: Session = Depends(get_db)
    ):
    """ Create a new supplier with the provided data."""
    service = SupplierService.SupplierService(db)
    return service.create_supplier(supplier_data)

# PUT: Update an existing supplier
@router.put(
            "/{supplier_id}", 
            response_model=SupplierRead, 
            summary="Update an existing Supplier"
        )
def update_supplier(
        supplier_id: int,
        updated_supplier: SupplierUpdate,
        db: Session = Depends(get_db)
    ):
    """ Update an existing supplier with the provided data."""
    service = SupplierService.SupplierService(db)
    supplier = service.update_supplier(supplier_id, updated_supplier)

    if not supplier:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Supplier not found"
        )
    return supplier 

# DELETE: Delete a supplier
@router.delete(
        "/{supplier_id}", 
        status_code=status.HTTP_204_NO_CONTENT,
        summary="Delete Supplier"
    )
def delete_supplier(
        supplier_id: int,
        db: Session = Depends(get_db)
    ):
    """ Delete a supplier by its ID."""
    service = SupplierService.SupplierService(db)
    success = service.delete_supplier(supplier_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Supplier not found"
        )
    # 204 No Content should not return a body 
    return Response(status_code=status.HTTP_204_NO_CONTENT)