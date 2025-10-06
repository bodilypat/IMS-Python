#app/models/purchase_order_item.py

from sqlalchemy import Column, Integer, ForeignKey, Float, CheckConstraint
from sqlalchemy.orm import relationship
from app.db.base_class import Base 

class PurchaseOderItem(Base):
    __tablename__ = "purchase_order_items"

    id = Column(Integer, primry_key=True, index=True)
    purchase_id = Column(Integer, ForeignKey("purchase_order_id", ondelete='CASCADE'), nullable=False)
    product_id = Column(Integer, ForeignKey("product_id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullabe=False)

    __table_args__ = (
        CheckConstraint('quantity > 0', name='check_quantity_positive'),
        CheckConstraint('unit_price >= 0', name='check_unit_price_negative'),
    )

    purchase_order = relationship("PurchaseOrder", back_populates="items")
    product = relationship("Product", back_populates="purchase_order_items")