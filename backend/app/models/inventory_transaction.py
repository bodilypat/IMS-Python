#app/models/inventory_transaction.py

from salalchemy import Column, Integer, ForeignKey, String, Enum, Numeric, DateTime, func
from sqlalchemy.orm import Session 
from app.db.base_class import Base 
import enum

class TransactionType(str, enum.Enum):
    IN = "IN"
    OUT = "OUT"
    ADJUSTMENT = "ADJUSTMENT"

class InventoryTransaction(Base):
    __tablename__ = "inventory_transactions"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
    type = Column(Enum(TransactionType), nullable=False)
    quantity = Column(Numeric(10, 2), nullable=False)
    reference = Column(String(255), nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

# Relationships 
product = relationship("Product", back_populates="inventory_transactions")
