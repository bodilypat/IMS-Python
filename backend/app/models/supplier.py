#app/models/supplier.py

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
from app.models.product import Product 

class Supplier(Base):
    __tablename__ = 'suppliers' 
 
    id = Column(Integer, primary_key=True, index=True) 
    name = Column(String(255), nullable=False) 
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(20), unique=True, index=True, nullable=False)
    address = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship with Product model
    products = relationship("Product", back_populates="supplier") 

 
    def __repr__(self):
        return f"<Supplier(id={self.id}, name={self.name}, email={self.email}, phone={self.phone}, address={self.address}, created_at={self.created_at})>"
    