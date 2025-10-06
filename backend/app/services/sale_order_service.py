#app/services/sale_order_service.py

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError 
from typing import List, Optional

from app.schemas.sale_order import SaleOrderCreate, SaleOrderUpdate 
from app.models.sale_order import SaleOrder 

class SaleOrderService:
    def __init__(self, db: Session):
        self.db = db 

    def get_all_sale_orders(self, skip: int = 0, limit: int = 10) -> List[SaleOrder]:
        """
            Retrieve a paginated list of sale orders.
        """
        return self.db.query(SaleOrder).offset(skip).limit(limit).all()
    
    def get_sale_order_by_id(self, sale_id: int) -> Optional[SaleOrder]:
        """
            Retrieve a single sale order by ID.
        """
        return self.db.query(SaleOrder).filter(SaleOrder.id == sale_id).first()
    
    def create_sale_order(self, sale_order_data: SaleOrderCreate) -> Optional[SaleOrder]:
        """
            Create a new sale order.
        """
        try:
            new_order = SaleOrder(**sale_order_data.dict())
            self.db.add(new_order)
            self.db.commit()
            self.db.refresh(new_order)
            return new_order 
        except SQLAlchemyError as e:
            self.db.rollback()
            raise e
        
    def update_sale_order(self, sale_id: int, updated_sale_order: SaleOrderUpdate) -> Optional[SaleOrder]:
        """
            Update an existing sale order.
        """
        sale_order = self.get_sale_order_by_id(sale_id)
        if not sale_order:
            return None
        
        for field, value in updated_sale_order.dict(exclude_unset=True).items():
            setattr(sale_order, field, value)

        self.db.commit()
        self.db.refresh(sale_order)
        return sale_order 
    
    def delete_sale_order(self, sale_id: int) -> bool:
        """
           Delete a sale order by ID. Return True if deleted, False if not found.
        """
        sale_order = self.get_sale_order_by_id(sale_id)

        if not sale_order:
            return False 
        
        self.db.delete(sale_order)
        self.db.commit()
        return True 
    
    