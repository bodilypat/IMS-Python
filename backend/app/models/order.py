#app/models/order.py 

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base
from datetime import datetime

class StockMovement(Base):
    __tablename__ = "stock_movements"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    movement_type = Column(String, nullable=False)  # 'in' or 'out'
    timestamp = Column(DateTime, default=datetime.utcnow)

    product = relationship("Product", back_populates="stock_movements")