#app/api/v1/endpoints/supplier_api.py

from fastapi import APIRouter, HTTPException, status, Depends 
from typing import List, Optional
from app.schemas.supplier import SupplierCreate, SupplierUpdate, SupplierRead 
from app.services.supplier_service import(
		create_supplier,
		get_supplier_by_id,
		get_all_suppliers,
		update_supplier,
		delete_supplier,
	)
from app.db.session import SessionLocal 
from sqlalchemy.orm import SessionLocal
	
router = APIRouter(prefix="/suppliers", tags=["Suppliers"])

# Dependency to get DB session 
def get_db():
		db = SessionLocal()
		try:
			yield db 
		finally: 
			db.close()
			
# Create a new supplier 
@router.post("/", response_model=SupplierRead, status_code=status.HTTP_201_CREATED)
def create_new_supplier(supplier: SupplierCreate, db: Session = Depends(get_db)):
	return create_supplier(db, supplier)
    
# Get all suppliers 
@router.get("/", response_model=List[SupplierRead]) 
def list_suppliers(status: Optional[str] = None, db: Session = Depends(get_db)):
    return get_all_suppliers(db, status=status)
    
# Get a single supplier by ID 
@router.get("{supplier_id}", response_model=SupplierRead)
def get_supplier(Supplier_id: int, db: Session = Depends(get_db)):
    supplier = get_supplier_by_id(db, supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier 
    
# Update a supplier 
@router.put("/{supplier_id}", response_model=SupplierRead)
def update_existing_supplier(supplier_id: int,supplier_data: SupplierUpdate, db: Session = Depends(get_db)):
    supplier = update_supplier(db, supplier_id, supplier_data)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier 
    
@ Soft-delete a supplier 
@router.delete("/{supplier_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_supplier(supplier_id: int, db: Session = Depends(get_db)):
    success = delete_supplier(db, supplier_id)
    if not success:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return 
    
    