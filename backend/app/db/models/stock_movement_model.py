#app/db/models/stock_movement_model.py

from sqlalchemy import (
        Column, 
        Integer, 
        String, 
        ForeignKey, 
        Text, 
        Float,
        CheckConstraint, 
        TIMESTAMP, 
        func
    )
from app.db.base import Base 

class StockMovement(Base):
	__tablename__ = "stock_movements"
	
	movement_id = Column(Integer, primary_key=True, index=True)
	product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
	movement_type = Column(String(10), nullable=False)
	quantity = Column(Float, nullable=False)
	source_reference = Column(String(100), nullable=True)
	movement_reason = Column(Text, nullable=True)
	created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
	
	__table_args__ = (
		checkConstraint("quantity > 0", name="check_quantity_positive"),
		checkConstraint("movement_type IN('IN', 'OUT')", name="check_movement_type_valid"),
    )
    
		