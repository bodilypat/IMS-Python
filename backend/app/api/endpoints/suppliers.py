#app/api/endpoints/suppliers.py

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, get_current_user
from app.models.user import User
from app.schemas.suppler import ( 
    SupplierCreate,
    SupplierResponse, 
    SupplierUpdate,
)
from app.schemas.product import ProductResponse
from app.services.supplier_service import (
    create_supplier,
    update_supplier,
    delete_supplier,
    get_current_by_id,
    list_suppliers,
    assign_supplier_to_product,
    fetch_suppliers_product,
)

router = APIRouter(prefix="/suppliers", tags=["suppliers"])

#--------------------------------------
# Create Supplier
#--------------------------------------
@router.post(
    "/", 
    response_model=SupplierResponse, 
    status_code=status.HTTP_201_CREATED
)
def create(
    supplier_info: SupplierCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        return create_supplier(
                supplier_in=supplier_info,
                contact_info=current_user,
                user_id=current_user.id
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

#--------------------------------------
# Update Supplier
#--------------------------------------
@router.put(
    "/{supplier_id}", 
    response_model=SupplierResponse
)
def update(
    supplier_id: int,
    supplier_info: SupplierUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        existing_supplier = get_current_by_id(
            db=db, 
            supplier_id=supplier_id, 
            user_id=current_user.id
        )
        if not existing_supplier:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Supplier not found"
            )
        return update_supplier(
            db=db,
            existing_supplier=existing_supplier,
            supplier_in=supplier_info
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

#--------------------------------------
# Delete Supplier
#--------------------------------------
@router.delete(
    "/{supplier_id}", 
    status_code=status.HTTP_204_NO_CONTENT
)
def delete(
    supplier_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        existing_supplier = get_current_by_id(
            db=db, 
            supplier_id=supplier_id, 
            user_id=current_user.id
        )
        if not existing_supplier:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Supplier not found"
            )
        delete_supplier(db=db, existing_supplier=existing_supplier)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    
#--------------------------------------
# Get Supplier by ID
#--------------------------------------
@router.get(
    "/{supplier_id}", 
    response_model=SupplierResponse
)
def get_by_id(
    supplier_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        existing_supplier = get_current_by_id(
            db=db, 
            supplier_id=supplier_id, 
            user_id=current_user.id
        )
        if not existing_supplier:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Supplier not found"
            )
        return existing_supplier
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

#--------------------------------------
# List Suppliers
#--------------------------------------
@router.get(
    "/", 
    response_model=List[SupplierResponse]
)
def list_all(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        return list_suppliers(db=db, user_id=current_user.id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

#--------------------------------------
# Assign Supplier to Product
#--------------------------------------
@router.post(
    "/{supplier_id}/assign/{product_id}", 
    response_model=SupplierResponse
)
def assign_to_product(
    supplier_id: int,
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        existing_supplier = get_current_by_id(
            db=db, 
            supplier_id=supplier_id, 
            user_id=current_user.id
        )
        if not existing_supplier:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Supplier not found"
            )
        return assign_supplier_to_product(
            db=db,
            supplier=existing_supplier,
            product_id=product_id
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )   
    
#--------------------------------------
# Fetch Supplier's Products
#--------------------------------------
@router.get(
    "/{supplier_id}/products", 
    response_model=List[ProductResponse]
)
def fetch_products(
    supplier_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        existing_supplier = get_current_by_id(
            db=db, 
            supplier_id=supplier_id, 
            user_id=current_user.id
        )
        if not existing_supplier:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Supplier not found"
            )
        return fetch_suppliers_product(
            db=db,
            supplier=existing_supplier
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    


