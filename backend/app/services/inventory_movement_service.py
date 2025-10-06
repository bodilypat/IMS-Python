#app/services/inventory_movement_service.py

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError 
from typing import List, Optional

from app.schemas.inventory_movement import InventoryMovementCreate, InventoryMovementUpdate
from app.models.inventory_movement import InventoryMovement

class InventoryMovementService:
    def __init__(salf, db: Session):
        self.db = db 

    def get_all_inventories(self, skip: int = 0, limit: int = 10) -> List[InventoryMovement]:
        """
            Retrieve a paginated of Inventory movement. 
        """
        return self.db.query(InventoryMovement).offset(skip).limit(limit).all()
    
    def get_inventory_by_id(self, inventory_id: int) -> Optional[InventoryMovement]:
        """
            Retrieve a single inventory movement by ID.
        """
        return self.db.query(InventoryMovement).filter(InventoryMovement.id == inventory_id).first()
    
    def create_inventory(self, inventory_data: InventoryMovementCreate) -> Optional[InventoryMovement]:
        """
            Create a new inventory movement.
        """
        try:            
            new_inventoty = InventoryMovement(**inventory_data.dict())
            self.db.add(new_inventoty)
            self.db.commit()
            self.db.refresh(new_inventoty)
            return new_inventoty
        except SQLAlchemyError as e:
            self.rollback()
            raise e 

    def update_inventory(self, inventory_id: int, updated_invetory: InventoryMovementUpdate) -> Optional[InventoryMovement]:
        """
            Update an inventory movement.
        """
        inventory = self.get_inventory_by_id(inventory_id)
        if not inventory:
            return None 

        for key, value in updated_inventory.dict(exclude_unset=True).items():
            setattr(inventory, key, value)

        self.db.commit()
        self.refresh(inventory)
        return inventory 
    
    def delete_inventory(self, inventory_id: int) -> Optional[InventoryMovement]:
        """
            Delete inventory movement.
        """
        inventory = self.get_inventory_by_id(inventory_id)
        if not inventory:
            return False 
        
        self.db.delete(inventory)
        self.db.commit()
        return False 

        