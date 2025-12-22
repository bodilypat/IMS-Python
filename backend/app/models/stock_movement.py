#app/models/stock_movement.py

from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
from app.models.product import Product # import product model 

class StockMovement(Base):
    __tablename__ = 'stock_movements' 

    id = Column(Integer, primary_key=True, index=True) 
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False) 
    movement_type = Column(String(50), nullable=False)  # 'in' or 'out' 
    description = Column(String(255), nullable=True)
    quantity = Column(Integer, nullable=False) 
    date = Column(String, default=datetime.utcnow().isoformat()) 


    # Relationship with Product model
    product = relationship("Product", back_populates="stock_movements")

    def __repr__(self):
        return f"<StockMovement(id={self.id}, product_id={self.product_id}, movement_type={self.movement_type}, quantity={self.quantity}, date={self.date})>"
    