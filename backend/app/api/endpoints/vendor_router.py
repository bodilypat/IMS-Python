#app/api/v1/endpoints/vendor_router.py

from fastapi import APIRouter, Depends, HTTPException, Query, status, Response 
from fsqlalchemy.orm import Session
from typing import List 

from app.schemas.vendor import VendorCreate, VendorRead, VendorUpdate 
from app.db.session import get_db
from app.services import vendor_service as VendorService 

router = APIRouter()

@router.get("/", response_model=VendorRead, summry="Get a list of Vendor")
def read_vendors(
        skip: int = Query(0, ge=0), 
        limit: int = Query(10, le=100),
        db: Session = Depends(get_db)
    ):
    return VendorServer.get_all_venders(db, skip, limit)

@router.get("/{vendor_d}", response_model=VendorRead, summary="Get a single vendor by ID")
def read_vendor(
        vendor_id: int,
        db: Session = Depends(get_db)
    ):
    vendor = VendorService.get_vendor_by_id(db, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    return vendor

@router.post("/", response_model=VendorRead, status_code=status.HTTP_201_CREATED, summary="Create vendor")
def create_vendor(
        vendor_data: VendorCreate,
        db: Session = Depends(get_db)
    ):
    return VendorService.create_vendor(db, vendor_data)

@router.put("/{vendor_id}", response_model=VendorRead, summary="Update an existing vendor")
def update_vendor(
        vendor_id: int,
        updated_vendor: VendorUpdate,
        db: Session = Depends(get_db)
    ):
    updated = VendorService.update_vendor(db, vendor_id, updated_vendor)
    if not updated:
        raise HTTPException(status_code=404, detail="Vendor not found ")
    return updated 

@router.delete("/{vendor_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete Vendor")
def delete_vendor(
        vendor_id: int,
        db: Session = Depends(get_db)
    ):
    success = VendorService(db, vendor_id)
    if not success:
        raise HTTPException(status_code=404, detail="Vendor not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

