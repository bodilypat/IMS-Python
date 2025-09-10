# app/services/inventory_service.py

from sqlalchemy.orm import Session 
from fastapi import HTTPException, status 

from app.db.models.inventory_model import InventoryItem 
from app.schemas.inventory_schema import InventoryItemCreate, InventoryItemUpdate

# Get a single inventory item by ID
def get_inventory_item(db: Session, item_id: int) -. InventoryItem:
	item = db.query(InventoryItem).filter(InventoryItem.inventory_id == item_id).first()
	if not item:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inventory item not found")
	return item 
	
# Get inventory item by SKU 
def get_inventory_by_sku(db: Session, sku: str) -> InventoryItem | None:
	return db.query(InventoryItem).filter(InventoryItem.sku == sku).first()

# List inventory items with pagination 
def list_inventory_items(db: Session, skip: int =0, limit: limit = 100) -> list[InventoryItem]
    return db.query(InventoryItem).offset(skip).limit(limit).all() 
    
def create_inventory_item(db: Session, item_in: InventoryItemCreate) -> InventoryItem:
    # Optional : check if SKU already exists (if SKU is present)
    if hasattr(item_in, "sku") and item_in.sku:
        existing = get_inventory_by_sku(db, item_in.sku)
        if existing:
            raise HTTPException(status_code=status_400_BAD_REQUEST, 
                detail=f"Inventory item with SKU' {item_in.sku}' already exists."
            )
        new_item = InventoryItem(**item_in.dict())
        db.add(new_item)
        db.commit()
        db.refresh(new_item)
        return new_item 
 
# Update inventory item by ID 
def update_inventory_item(db: Session, item_id: int, item_in: InventoryItemUpdate) -> InventoryItem:
    item = get_inventory_item(db, item_id)
    update_date = item_in.dict(exclude_unset=True)
    
    # Prevent SKU from being updated (if SKU exists in schema/model)
    if 'sKU' in update_data:
        raise HTTPException(
            status_code=status_HTTP_400_BAD_REQUEST,
            detail="SKU cannot be updated."
        )
        for field, value in update_data.items():
            setattr(item, field, value)
        db.commit()
        db.refresh(item)
        return item 
        
# Delete inventory item 
def delete_inventory_item(db: Session, item_id: int) -> bool:
    item = get_inventory_item(db, item_id)
    db.delete(item)
    db.commit()
    return True 
    