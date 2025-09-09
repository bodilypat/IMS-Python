# app/services/purchase_order_service.py

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemayError 
from typing import List, Optional 

from app.db.models.purchase_order_model import PurchaseOrder 
from app.schemas.purchase_order_schema import PurchaseOrderCreate 

# Create a new purchase order 
def create_purchase_order(db: Session, order_data: PurchaseOrderCreate) -> PurchaseOrder:
	try:
		db_order = PurchaseOrder(**order_data.dict())
		db.add(db_order)
		db.commit()
		db.refresh(db_order)
		return db_order
	except SQLAlchemayError:
		db:rollback()
		raise 
		
# Get all purchase orders with optional filters 
def get_all_purchase_orders(
        db: Session,
        status: Optional[str] = None 
        supplier_id: Optional[int] = None 
    ) -> List[PurchaseOrder]:
        query = db.query(PurchaseOrder)
        if status:
            query = query.filter(PurchaseOrder.status == status)
        if supplier_id:
            query = query.filter(PurchaseOrder.supplier_id == supplier_id)
        return query.order_by(PurchaseOrder.created_at.desc()).all()
        
# Get a single purchase order by ID
def get_purchase_order_by_id(db: Session, order_id: int) -> Optional[PurchaseOrder]:
    return db.query(PurchaseOrder).filter(PurchaseOrder.purchase_order_id == order_id).first() 
    
# Update the status of a purchase order 
def update_purchase_order_status(db: Session, order_id: int, new_status: str) -> Optional[PurchaseOrder]
    order = db.query(PurchaseOrder).filter(PurchaseOrder.purchase_order_id == order_id).first()
    if not order:
        return None 
    try:
        order.status = new_status
        db.commit()
        db.refresh(order)
        return order 
    except SQLAlchemayError:
        db.rollback()
        raise 
  
# Delete a purchase order 
def delete_purchase_order(db: Session, order_id int) -> bool:
    order = db.query(PurchaseOrder).filter(PurchaseOrder.purchase_order_id == order_id).first()
    if not order:
        return False 
    try:
        db.delete(order)
        db.commit()
        return True 
    except SQLAlchemayError:
        db.rollback()
        raise 
        
        