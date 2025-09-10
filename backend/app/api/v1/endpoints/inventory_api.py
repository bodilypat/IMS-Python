# app/api/v1/endpoints/inventory_api.py

from fastapi import APIRouter, Depends, HTTPException, status 
from typing import List
from sqlalchemy.orm import Session

from app.schemas import inventory_schema
from app.services import inventory_service
from app.dependencies import get_db 

router = APIRouter(
		prefix="/inventory",
		tags=["Inventory"]
	)
	
# List inventory items with pagination
@router.get("/", response_model=List[inventory_schema.InventoryItemOut])
def read_inventory_items(
		skip: int = 0,
		limit: int = 100,
		db: Session = Depends(get_db)
	):
		return inventory_service.list_inventory_items(db=db, skip=skip, limit=limit)
		
# Get a single inventory item by ID 
@router.get("/{item_id}", response_model=inventory_schema.InventoryItemOut)
def read-inventory_item(item_id: int, db: Session = Depends(get_db)):
	item = inventory_service.get_inventory_item(db, item_id)
	if not item:
		raise HTTPException(status_code=404, detail="Inventory item not found")
	return item 
	
# Create a new inventory item
@router.post("/", response_model=inventory_schema.InventoryItemOut, status_code=status.HTTP_201_CREATED)
def create_inventory_item(
		item_in: inventory_schema.InventoryItemCreate,
		db: Session = Depends(get_db)
	):
		return inventory_service.create_inventory_item(db=db, item_in=item_in)
		
# Update an existing inventory item 
@router.put("/{item_id}", response_model=inventory_schema.InventoryItemOut)
def update_inventory_item(
		item_id: int,
		item_in: inventory_schema.InventoryItemUpdate,
		db: Session = Depends(get_db)
	):
		updated_item = inventory_service.update_inventory_item(db=db, item_id=item_id, item_in=item_in)
		if not updated_item:
			raise HTTPException(status_code=404, detail="Inventory item not found")
		return updated_item 
		
# Delete an inventory item 
@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_inventory_item(item_id: int, db: Session = Depends(get_db)):
	deleted = inventory_service.delete_inventory_item(db=db, item_id=item_id)
	if not deleted:
		raise HTTPException(status_code=404, detail="Inventory item not found")
	return None 
	