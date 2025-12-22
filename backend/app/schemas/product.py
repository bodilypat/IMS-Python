#app/models/product.py

from sqlalchemy import Column, Integer, String, Float, Boolean, Text
from app.database import Base

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    sku = Column(String(100), unique=True, nullable=False)
    category = Column(String(100), nullable=True)
    image_url = Column(String(255), nullable=True)
    rating = Column(Float, nullable=True)
    is_in_stock = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)


    def __repr__(self):
        return f"<Product(name={self.name}, price={self.price}, in_stock={self.is_in_stock})>"
    
    