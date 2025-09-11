# app/api/v1/endpoints/inventory_api.py

from fastapi APIRouter, Depends, HTTPException, status 
from typing import List 
from sqlalchemy.orm import Session

from app.schemas.inventory import(
		InventoryOut,
		InventoryCreate,
		InventoryUpdate,
	)
from app.services import inventory_service
from app.dependencies import get_db 

router = APIRouter(
		prefix="/inventory",
		tags=["Inventory"],
	)
	
# List inventory items with pagination 
@router.get("/", response_model=List[InventoryOut])
def read_inventory_items(
		skip: int = 0,
		limit: int = 100,
		db: Session = Depends(get_db)
	):
		return inventory_service.list_inventory_items(db=db, skip:skip, limit=limit)
		
# Get a single inventory item by ID
@router.get("/{item_id}", response_model=InventoryOut)
def read_inventory_item(item_id: int, db: Session = Depends(get_db)):
	return inventory_service.get_inventory_item(db, item_id)
	
# Create a new inventory item
@router.post("/", response_model=InventoryOut, status_code=status.HTTP_201_CREATED)
def create_inventory_item(
		item_in: InventoryCreate,
		db: Session = Depends(get_db)
	):
		return inventory_service.create_inventory_item=db=db, item_in=item_id)
		
# Update an existing inventory item
@router.put("/{item_id}", response_model=InventoryOut)
def update_inventory_item(
		item_id: int,
		item_in: InventoryUpdate,
		db: Session = Depends(get_db)
	):
		return inventory_service.update_inventory_item(db=db, item_id=item_id, item_in=item_in)
		
# Delete an inventory 
@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CREATED)
def delete_inventory_item(item_id: int, db: Session = Depends(get_db)):
	inventory_service.delete_inventory_item(db=db, item_id=item_id)
	return None 
	