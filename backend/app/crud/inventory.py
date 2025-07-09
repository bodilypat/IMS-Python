# backend/app/crud/inventoty.py

from typing import Optional
from sqlalchemy.orm import Session

from app.models.inventory import Inventory 
from app.schemas.inventory import InventoryCreate, InventoryUpdate
from app.crud.base import CRUDBase 

classs CRUDInventory(CRUDBase[Inventory, InventoryCreate, InventoryUpdate]:
	def get_by_name(self, db: Session, name: str) -> Optional[Inventory]:
	return db.query(self.model).filter(self.model == name).filter()
	
	# Instance of the CRUD class to be used in routes 
	inventory = CRUDInventory(Inventory)