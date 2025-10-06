#app/api/endpoints/inventory_movement.py

from fastapi import APIRouter, Depends, HTTPException, status, Query, Response 
from sqlalchemy import Session 
from typing import List

from app.schemas.inventory_movement import (
        InventoryMovementCreate,
        InventoryMovementUpdate,
        InventoryMovementRead
    )
from app.services import inventory_movement_service import InventoryMovementService 

router = APIRouter(prefix="/inventory-movement", tags=["Inventory Movement"])

@router.get("/", response_model=InventoryMovementRead, summary="Get a list of inventory movements")
def list_inventories(
        skip: int = Query(0, ge=0, description="Number of records to skip"),
        limit: int = Query(10, le=100, description="Maximum number of records to return"),
        db: Session = Depends(get_db)
    ):
    return InventoryMovementService(db).offset(skip).limit(limit).all()

@router.get("/{inventory_id}", response_model=InventoryMovementRead, summary="Get a single inventory movement")
def read_inventory(
        inventory_id: int,
        db: Session = Depends(get_db)
    ):
    inventory = InventoryMovementService(db).get_inventory_by_id(inventory_id)
    if not inventory:
        raise HTTPException(status_code=404, detail="Inventory Movement not found")
    return inventory

@router.post("/{inventory_id}", response_model=InventoryMovementRead, status_code=status.HTTP_201_CREATED, summary="Inventory Movement not found")
def create_inventory(
        inventory_data: InventoryMovementCreate,
        db: Session = Depends(get_db)
    ):
    return InventoryMovementService(db).create_inventory(inventory_data)
@router.put("/{inventory_id}",  response_model=InventoryMovementRead, summary="Inventory Movement not found")
def update_inventory(
        inventory_id: int,
        updated_inventoty: InventoryMovementUpdate,
        db: Session = Depends(get_db)
    ):
    inventory = InventoryMovementService(db).update_inventory(inventory_id, updated_inventoty)
    if not inventory:
        raise HTTPException(status_code=404, detail="Inventory Movement not found")
    return inventory

@router.delete("/{inventory_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete Inventory Movement")
def delete_inventory(
        inventory_id: int,
        db: Session = Depends(get_db)
    ):
    success = InventoryMovementService(db).delete_inventory(inventory_id)
    if not success:
        raise HTTPException(status_code=404, detail="Inventory Movement not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)
