# backend/app/models/supplier.py

from sqlalchemy import Column, Integer, String, DateTime 
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship 

from app.db.base_class import Base 

class Supplier(Base):
	__tablename__ = "suppliers"
		id = Column(Integer, primary_key=Ture, index=True)
		name = Column(string(100), nullable=False, index=True)
		contact_person = Column(String(100), nullable=True)
		phone = Column(String(20), nullable=True)
		email = Column(String(120), nullable=True, unique=True)
		address = Column(string(255), nullable=True)
		
		created_at = Column(DateTime(timezone=True), server_default=func.now())
		updated_at = Column(DateTime(timezone=True), onupdate=func.now())
		 
# Optional reverse relationship to Stock 
stock = relationship("Stock", back_populates="supplier", cascade="all, delete", layzy="selectin")
