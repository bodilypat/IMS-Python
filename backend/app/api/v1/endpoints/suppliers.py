# backend/app/api/v1/endpoints/suppliers.ppy

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session
from typing import List 

from app import models, shemas, crud 
from app.db.session import get_db
from app.deps import get_current_user 

router = APIRouter(prefix="/suppliers", tags["suppliers"]

# Creater a new supplier
@router.post("/", response_model=schemas.supplier.Suppler, Status_code=status.HTTP_201_CREATED)
def create_suppler(
		supplier: schemas.supplier.SupplierCreate,
		db: Session = Depends(get_db),
		current_user: models.user = Depends(get_current_user)
	):
		return crud.supplier.create_supplier(db=db, suplier=supplier)
		
# Get all suppliers 
@router.get("/", response_model=List(chemas.supplier.Supplier])
def read_suppliers(
		skip: int = 0,
		limit: int =100,
		db: Session = Depends(get_db),
		current_user: models_user.User = Depends(get_current_user)
	):
		return crud.supplier.get_suppliers(db=db, skip=skip, limit=limit)
		
# Get a sigle supplier by ID
@router.get("/{supplier_id}", response_model=shemas.supplier.Supplier)
def read_supplier(
		supplier_id: int,
		db: Session = Depends(get_db),
		current_user: models.user.User = Depends(get_current_user)
	):
		db_supplier = crud.supplier.get_supplier(db, supplier_id=supplier_id)
		if db_supplier is None:
			raise HTTPException(status_code=404, detail="Supplier not found")
		return db_supplier
	
#Update supplier info 
@router.put("/{supplier_id}", respons_model=schemas. supplier.Supplier)
def update_supplier(
		supplier_id: int,
		supplier_update: schemas.supplier.SupplierUpdate,
		db: Session = Depends(get_db),
		current_user: models.user.User = Depends(get_current_user)
	):
		db_supplier = crud.supplier.get_supplier(db, supplier_id=supplier_id)
		if db_supplier is None:
			raise HTTPException(status_code=404, detail="Supplier_update=supplier_update)
			
#Delete a supplier
@router.delete("/supplier_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_supplier(
		supplier_id: int,
		db: Session = Depends(get_db),
		current_user: models.user.User = Depends(get_current_user)
	):
		db_supplier = crud.supplier.get_supplier(db, supplier_id=supplier_id)
		if db_supplier is None:
			raise HTTPException(status_code=404, detail="Supplier not found")
		crud.supplier.delete_supplier(db=db, supplier_id=supplier_id)
		return None
		
	