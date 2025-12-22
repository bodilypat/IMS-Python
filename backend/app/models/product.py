#app/models/product.py

from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.supplier import product_supplier

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True)
    quantity = Column(Integer, index=True)
    price = Column(Float, index=True)
    min_stock = Column(Integer, index=True)
    max_stock = Column(Integer, index=True)
    
    suppliers = relationship("Supplier", secondary=product_supplier, back_populates="products")

    def __repr__(self):
        return f"<Product(name={self.name}, price={self.price})>"
    