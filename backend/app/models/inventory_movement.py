#pp/models/inventory_movement.py

from sqlalchemy import Column, Integer, String, DateTime, Foreign
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class InventoryMovement(Base):
    __tablename__ = 'inventory_movements'

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products_id", ondelete="CASCADE"))
    location = Column(String(100))
    quantity = Column(Integer, nullable=False)
    last_updated = Column(DateTime)

    product = relationship("Product"), back_populates="inventory_movements"