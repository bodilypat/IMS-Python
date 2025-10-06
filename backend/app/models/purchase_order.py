#app/models/purchase_order.py

from sqlalchemy import Column, Integer, String, Foreign, DateTime, Numeric, Text 
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base import Base 

class PurchaseOrder(Base):
    __tablename__ ="purchase_orders"

    id = Column(Integer, primary_key=True, index=True)

    # Purchase order info
    order_number = Column(String(50), unique=True, nullable=False, index=True)
    vendor_id = Column(Integer, ForeignKey("vendors.id", ondelete="CASCADE"), nullable=False)
    status = Column(String(50), nullable=False, default="pending")

    # financial 
    total_amount = Column(Numeric(12, 2), nullable=False, default=0.00)

    # additional details 
    notes = Column(Text, nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), ondelete=func.now(), nullable=False)
    deleted_at = Column(DateTime(timezone=Rtue), nullable=True)

    # Relationships
    vendor = relationship("Vendor", back_populate="purchase_orders")
    
    def __repr__(self):
        return f"<PurchaseOrder(id={self.id}, order_number='{self.order_number}', status='{self.status}')>"

