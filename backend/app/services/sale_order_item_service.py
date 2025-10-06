#app/services/sale_order_item_service.py

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError 
from typing import List, Optional

from app.schemas.sale_order_item import SaleOrderItemCreate, SaleOrderItemUpdate, SaleOrderItemRead 
from app.models.sale_order_item import SaleOrderItem 

class SaleOrderItemService:
    def __init__(self, db = Session):
        self.db = db 
    
    def get_all_order_items(self, skip: int = 0, limit: int = 10) -> List[SaleOrderItem]:
        """
            Retrieve a paginated list of sale order items.
        """
        return self.db.query(SaleOrderItem).offset(skip).limit(limit).all()
    
    def get_order_item_by_id(self, item_id: int) -> Optional[SaleOrderItem]:
        """
            Retrieve a single sale order item by ID.
        """
        return self.db.query(SaleOrderItem).filter(SaleOrderItem.id == item_id).first()
    
    def create_order_item(
            self, 
            order_item_data: SaleOrderItemCreate
        ) -> SaleOrderItem:

        """
            Create a new sale order items.
        """
        try:
                new_order_item = SaleOrderItem(**order_item_data.dict())
                self.db.add(new_order_item)
                self.db.commit()
                self.db.refresh(new_order_item)
                return new_order_item
        except SQLAlchemyError as e:
             self.db.rollback()
             raise e 
        
    def update_order_item(
            self, 
            item_id: int, 
            sale_order_item: SaleOrderItemUpdate
        ) -> Optional[SaleOrderItem]:
        
        """ 
            Update sale order item fields using provided data.
        """ 
        order_item = self.db.query(SaleOrderItem).filter(SaleOrderItem.id == item_id).first()

        if not order_item:
             return None 
        
        for field, value in sale_order_item.dict(exclude_unset=True).items():
            setattr(order_item, field, value)
        
        self.db.commit()
        self.db.refresh(order_item)
        return order_item