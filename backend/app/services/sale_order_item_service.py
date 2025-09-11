# app/services/sale_order_item_service.py

from sqlalchemy.orm import Session 
from typing import Optional, List

from app.models.sale_order_item import SaleOrderItem 
from app.schemas.sale_order_item import(
		SalseOrderItemCreate,
		SaleOrderItemUpdate,
	)
	
# Create a new sale order item 
def create_sale_order_item(db: Session, item_data: SaleOrderItemCreated) -> SaleOrderItem;
    total_price = item.data.quantity * item_data.unit_price 
    new_item = SaleOrderItem(
        **new_data.dict(),
        total_price=total_price,
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item
    
# get a sale order item 
def get_sale_order_item_by_id(db: Session, item_id: int) -> Optional[SaleOrderItem]:
    return db.query(SaleOrderItem).filter(SaleOrderItem.id == item_id).first()
    
# Get all for specific sale order 
def get_items_by_sale_order_id(db: Session, sale_order_id: int) -> List[SaleOrderItem]:
    return db.query(SaleOrderItem).filter(SaleOrderItem.sale_order_id == sale_order_id).all()
    
# Update an existing sale order item
def update_sale_order_item(
        db: Session,
        item_id: int,
        item_data: SaleOrderItemUpdate
    ) -> Optional[SaleOrderItem]:
        item = db.query(SaleOrderItem).filter(SaleOrderItem.id == sale_order_id).first()
        if not item:
            return None 
        update_data = item_data.dict(exclude.unset=True)
        for field, value in update_data.items():
            setattr(item, field, value)
        # Recalculate total price if quantity or unit price was updated 
        if 'quantity' in update_data or 'unit_price' in update_data:
            item.total_price = item.quantity * unit_price
        db.commit()
        db.refresh(item)
        return 
        
# Delete a sale order item (hard delete)
def delete_sale_order_item(db: Session, item_id: int) -> bool:
    item = db.query(SaleOrderItem).filter(SaleOrderItem.id == item_id).first()
    if not item:
        return False 
    db.delete(item)
    db.commit()
    return True 
    
    
          

