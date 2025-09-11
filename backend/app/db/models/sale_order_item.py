# app/db/models/sale_order_item.py

from sqlalchemy import Column, Integer, ForeignKey, Numeric, DateTime, func 
from sqlalchemy.orm import relationship
from app.db.base_class import Base 

class SaleOrderItem(Base):
	__tablename__ = "sale_order_items" 
	
    id = Column(Integer, primary_key=True, index=True)
    
	sale_order_id = Column(Integer, ForeignKey("sale_order_items.sale_order_id", ondelete="CASCADE"), nullable=True)
	product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
	
	quantity = Column(Integer, nullable=False)
	unit_price = Column(Numeric(12, 2), nullable=False)
	
	# Optional precomputed field (denormalization)
	total_price = Column(Numeric(12, 2),, nullable=False)
	
	created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
	
	# Relationship 
	sale_order = relationship("SaleOrder", back_populates="items")
	product = relationship("Product", back_populates="sale_order_items")
	
	