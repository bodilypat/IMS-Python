#app/models/sale_order_item.py

from sqlalchemy import Column, Integer, Date, ForeignKey, Float, CheckConstraint
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class SaleOrderItem(Base):
    __tablename__ = "sale_order_tiems"

    id = Column(Integer, primary_key=True, index=True)
    sale_id = Column(Integer, ForeignKey("sale_orders.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    unit_price = Column(Float, nullable=False)


    __table_args__ = (
        CheckConstraint('quantity > 0', name='check_sale_qauntity_positive'),
        CheckConstraint('unit_price >=0 ', name='check_sale_unit_price_non_negative'),
    )

    sale_order = relationship("SaleOrder", back_populates="items")
    product = relationship("Product", back_populates="sale_order_items")