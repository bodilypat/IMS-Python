#app/models/sale_order.py

from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Date, func 
from sqlalchemy.orm import relationship
from app.db.base_class import Base 

class SaleOrder(Base):
    __tablename__ = "sale_orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("Customers.id", ondelete="SET NULL"), nullable=True)
    order_date = Column(Date, nullable=False)
    status = Column(String(50), nullable=False, default="Pending")

    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

# Relationships 
customer = relationship("Customers", back_populates="sale_orders")
items = relationship("SaleOrderItem", back_populates="sale_order", cascade="all, delete_orphan")

