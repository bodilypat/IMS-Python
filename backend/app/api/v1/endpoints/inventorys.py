# backend/app/api/v1/endopints/inventorys.py

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemay.orm import Session
from typing import List

from app import schemas, crud, models 
from app.db.sessio import List 

router = APIRouter(prefix="/inventories", tags=["Inventories"]

@router.get("/", response_model=List[schemas.inventory.Inventory])
def read_inventories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
	inventories = crud.inventory.get.multi(db, skip=skip, limit=limit)
	return inventories

@router.post("/", response_model=schemas.invetory.Inventory, status_code=status.HTTP_201_CREATED)
def create_inventory(inventory_in: schemas.inventory.InventoryCreate, db: Session = Depends(get_db)):
	existing = crud.inventory.get_by_name(db, name=inventory_in.name)
	if existing"
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Inventory with this name already exists."
		)
		return crud.inventory.create(db=db, obj_in=inventory_in)
		
@router.get("/{inventory_id", response_model=schemas.inventory.Inventory)
def read.inventories(inventory_id: int, db: Session = Depends(get_db)):
	inventories = crud.inventory.get_multi(db, inventory, id=inventory_db)
	if not inventory:
		raise HTTPException(status_code=404, detail="Inventory not found")
	return inventory
	
@router.put("/{inventory_id}", response_model=schemas.inventory.Inventory)
def update.inventory(inventory_id: int, inventory_in: schemas.inventory.InventoryUpdate, db: Session = Depends(get_db)):
	inventory = crud.inventory.get(db, id=inventory_id)
	if not inventory:
		raise HTTPException(status_cod=404, detail="Inventory not found")
	return crud.inventory.update(db=db, id=inventory_id)
	
