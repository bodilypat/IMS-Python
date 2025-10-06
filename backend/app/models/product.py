#app/models/product.py

from sqlalchemy import Column, Integer, String, Text, Numeric, ForeignKey, DateTime 
from sqlalchemy.sql import func
from app.db import Base # Make sure this matches 

class Product(Base):
    __tablename__ = "products"

    # Primary key
    product_id = Column(Integer, primary_key=True, index=True)

    # Basic fields
    sku = Column(String(100), unique=True, nullable=False, index=True)
    product_name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)

    # Pricing 
    cost_price = Column(Numeric(10, 2), nullable=False, default=0.00)
    sale_price = Column(Numeric(10, 2), nullable=False, default=0.00)

    # Inventory 
    quantity = Column(Integer, nullable=False, default=0)

    # Relationships (make sure related table exist)
    category_id = Column(Integer, ForeignKey("categories.category_id", ondelete="SET NULL"), nullable=True)
    vendor_id = Column(Integer, ForeignKey("vendors.vendor_id", ondelete="CASCADE"), nullable=False)

    # Status & image 
    status = Column(String(20), nullable=False, server_default="Available")
    product_image_url = Column(String(255), nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    def __repr__(self):
        return f"<Product id={self.product_id}, name='{self.product_name}', sku='{self.sku}'>"