#app/db/models/sale_order.py 

from sqlalchemy import Column, Integer, ForeignKey, String, Numeric, DateTime, func, Boolean 
from sqlalchemy.orm import relationship
from app.db.base_class import Base 

class SaleOrder(Base):
	__tablename__ = "sale_orders"
	
	sale_order_id = Column(Integer, primary_key=True, index=True)
	customer_id = Column(Integer, ForeignKey("customers.customer_id", ondelete="SET NULL"), nullable=True)
	order_date = Column(DateTime, nullable=False, server_default=func.now())
	status = Column(String(20), nullable=False, default="Pending")
	total_amount = Column(Numeric(12, 2), default=0.00)
	created_at = Column(DateTime, nullable=False, server_default=func.now())
	is_deleted = Column(Boolean, default=False)
	
	customer = relationship("Customers", back_populates="sale_orders")
	