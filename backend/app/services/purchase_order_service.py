#app/services/purchase_order_service.py

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError 
from typing import List, Optional

from app.schemas.purchase_order import PurchaseOrderCreate, PurchaseOrderUpdate
from app.models.purchase_order import PurchaseOrder 

class PurchaseOrderService:
    def __init__(self, db: Session):
        self.db =db 

    def get_all_purchases(self, skip: int = 0, limit: int = 10) -> List[PurchaseOrder]:
        """
            Retrieve a paginate list of purchase order.
        """
        return self.db.query(PurchaseOrder).offset(skip).limit(limit).all()
    
    def get_purchase_by_id(self, purchase_id: int) -> Optional[PurchaseOrder]:
        """
            Retrieve a single purchase order by ID.
        """
        return self.db.query(PurchaseOrder).filter(PurchaseOrder.id == purchase_id).first()
    
    def create_purchase(self, purchase_data: PurchaseOrderCreate) -> PurchaseOrder:
        """
            Create a new purchase order.
        """
        try:
            new_purchase = PurchaseOrder(**purchase_data.dict())
            self.db.add(new_purchase)
            self.db.commit()
            self.db.refresh(new_purchase)
            return new_purchase
        except SQLAlchemyError as e:
            self.db.rollback()
            raise e 
        
    def update_purchase(self, purchase_id: int, purchase_order_data: PurchaseOrderUpdate) -> Optional[PurchaseOrder]:
        """
            Update purchase order fields using provided data.
        """
        purchase_order = self.get_purchase_by_id(purchase_id)
        if not purchase_order:
            return None 
        
        for field, value in purchase_order_data.dict(exclude_unset=True).items():
            setattr(purchase_order, field, value)
        self.db.commit()
        self.db.refresh(purchase_order)
        return purchase_order 
    
    def delete_purchase(self, purchase_id: int)-> Optional[PurchaseOrder]:
        """
            Delete a purchase order by ID. Return True if deleted, False if not found.
        """
        purchase_order = self.get_purchase_by_id(purchase_id)

        if not purchase_order:
            return False 
        
        self.db.delete(purchase_order)
        self.db.commit()
        return True
