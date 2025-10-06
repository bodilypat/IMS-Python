#app/models/supplier.py

from sqlalchemy import Column, Integer, String, Text, DateTime 
from sqlalchemy.sql import func 
from app.db import Base 

class Supplier(Base):
    __tablename__= "suppliers"

    supplier_id = Column(Integer, primary_key, index=True)
    name = Column(String(255), nullable=False)
    contact_email = Column(String(255), uinique=True, nullable=True)
    phone = Column(String(20), nullable=True)
    address = Column(Text, nullable=True)

# Timestamp 
    created_at = Columm(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    def __repr__(self):
        return f"<Supplier id={self.supplier_id}, name='{self.name}'> "