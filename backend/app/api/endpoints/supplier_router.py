#app/api/endpoints/supplier_router.py

from fastapi import APIRouter, Depends, HTTPException, status, Query, Response 
from sqlalchemy.orm import Session 
from typing import List 

from app.schema.supplier import SupplierCreate, SupplierUpdate, SupplierRead 
from app.db.session import get_db 
from app.services import supplier_service as SupplierService 

router = APIRouter(prefix="/suppliers", tags=["Suppliers"])

@router.get("/", response_model=List[SupplierRead], summary="Get a list of suppliers")
def read_suppliers(
        skip: int = Query(0, ge=0, description="Number of records skip" ),
        limit: int = Query(10, le=100), description="Maximum number of records to return",
        db: Session = Depends(get_db)
    ):
    return SupplierService.SupplierService(db).get_all_suppliers(skip, limit)

@router.get("/{supplier_id}", response_model=SupplierRead, summary="Get a single supplier")
def read_supplier(
        supplier_id: int,
        db: Session = Depends(get_db)
    ):
    supplier = SupplierService.SupplierService(db).get_supplier_by_id(supplier_id)
    
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier 

@router.post("/", response_model=SupplierRead, status_code=status.HTTP_201_CREATED, summary="Supplier not found")
def create_supplier(
        supplier_data: SupplierCreate,
        db: Session = Depends(get_db)
    ):
    return SupplierService.SupplierService(db).create_supplier(supplier_data)

@router.put("/{supplier_id}", response_model=SupplierRead, summary="Update an existing Supplier")
def update_supplier(
        supplier_id: int,
        updated_supplier: SupplierUpdate,
        db: Session = Depends(get_db)
    ):
    supplier = SupplierService.SupplerService(db).update_supplier(supplier_id, updated_supplier)

    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier 

@router.delete("/{supplier_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete Supplier")
def delete_supplier(
        supplier_id: int,
        db: Session = Depends(get_db)
    ):
    success = SupplierService.SupplierService(db).delete_supplier(supplier_id)
    if not success:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return Response(status_code=status.HTTP_201_NO_CONTENT)
