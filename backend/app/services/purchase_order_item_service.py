#app/services/purchase_order_item_service.py

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError 
from typing import List, Optional

from app.schemas.purchase_order_item import PurchaseOrderItemCreate, PurchaseOrderItemUpdate, 
from app.models import PurchaseOrderItem

class PurchaseOrderItemService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_items(self, skip: int = 0, limit: int = 10) -> List[PurchaseOrderItem]:
        """
            Retrieve a paginated list of purchase order items.
        """
        return self.db.query(PurchaseOrderItem).offset(skip).limit(limit).all()
    
    def get_item_by_id(self, item_id: int) -> Optional[PurchaseOrderItem]:
        """
            Retrieve a single purchase order item by ID.
        """
        return self.db.query(PurchaseOrderItem).filter(PurchaseOrderItem.id == item_id).first()
    
    def create_items(self, order_item_data: PurchaseOrderItemCreate) -> Optional[PurchaseOrderItem]:
        """
            Create a new purchase order item.
        """
        try:
            new_item = PurchaseOrderItem(**order_item_data.dict())
            self.db.add(new_item)
            self.db.commit()
            self.db.refresh(new_item)
            return new_item
        except SQLAlchemyError as e:
            self.db.rollback()
            raise e
        
    def update_item(self, item_id, update_order_item: PurchaseOrderItemUpdate) -> Optional[PurchaseOrderItem]:
        """
            Update purchase order item fields using provided data.
        """
        item = self.db.query(PurchaseOrderItem).filter(PurchaseOrderItem.id == item_id).first()
        if not item:
            return None
        
        for key, value in update_order_item.dict(exclude_unset=True).items():
            setattr(item, key, value)

        self.db.commit()
        self.db.refresh(item)
        return item 
    
    def delete_item(self, item_id: int) -> bool:
        """
            Delete purchase order item by ID.
        """
        item = self.get_item_by_id(item_id)
        if not item:
            return False 
        
        self.db.delete(item)
        self.db.commit()
        return True