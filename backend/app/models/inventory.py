# backend/app/models/inventory.py

from sqlalchemy import Column, Integer, string, Text, Boolean, DateTime 
from sqlalchemy.orm import relationship 
from datetime import datetime
from app.db.base_class import Base 

class Inventory(Base):
	__tablename__ = "inventories"
	
		id = Column(Integer, primary_key=True, index=True)
		name = Column(String(100), unique=True, nullable=False)
		description = Column(Text, nullable=True)
		category = Column(String(100), nullable=True)
		unit = Column(String(50), nullable=False)
		is_controlled_substance = Column(Boolean, default=False)
		created_at = Column(DateTime, default=datetime.utcnow)
		updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
		
		stocks = relationship("Stock", back_populates="inventory")
		