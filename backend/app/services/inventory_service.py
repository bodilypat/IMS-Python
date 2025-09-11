# app/services/inventory_service.py 

from sqlalchemy.orm import Session
from fastapi import HTTPException, status 

from app.db.models.inventory import Inventory
from app.schemas.inventory import InventoryCreate, InventoryUpdate 

# Get a single inventory item by ID
def get_inventory_item(db: Session, item_id: int) ->Inventory:
	item = db.query(Inventory).filter(Inventory.inventory_id == item_id).first()
	if not item:
		raise HTTPException(
				status_code=status.HTTP_404_NOT_FOUND,
				detail="Inventory item by found"
			)
	return item 
	
# Optional : Get inventory item by SKU(if SKU exists)
def get_inventory_by_sku(db: Session, sku: str) -> Inventory | None:
	return db.query(Inventory).filter(Inventory.sku == sku).first()
	
# List inventory items with pagination
def list_inventory_items(db: Session, skip: int = 0, limit: int = 100) -> list[Inventory]:
	return db.query(Inventory).offset(skip).limit(limit).all()
	
# Create inventory item 
def create_inventory_item(db: Session, item_in: InventoryCreate) -> Inventory:
	# Optional SKU uniqueness check (if using SKU)
	if hasattr(item_in,"sku") and item_in.sku:
		existing = get_inventory_by_sku(db, item_in.sku)
		if existing:
			raise HTTPException(
				status_code=status.HTTP_400_BAD_REQUEST,
				detail=f"Inventory item with SKU '{item_in.sku}' already exists."
			)
		new_item = Inventory(**item_in.dict())
		db.add(new_item)
		db.commit()
		db.refresh(new_item)
		return new_item 
		
# Update inventory item 
def update_inventory_item(db: Session, item_id: int, item_in: InventoryUpdate) ->Inventory:
	item = get_inventory_item(db, item_id)
	update_data = item_in.dict(exclude_unset=True)
	
	# Optional: Prevent SKU from being updated
	if "sku" in update_data:
		raise HTTPException(
				status_code=status.HTTP_400_BAD_REQUEST,
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
	db.commit()
	return True 
	