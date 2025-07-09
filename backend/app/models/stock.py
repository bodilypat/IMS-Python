# backend/app/models/stock.py

from sqlalchemy import Column, Integer, String, ForeignKey, Date, Float, DateTime 
from sqlalchemy.orm import relationship 
from datetime import datetime
from app.db.base_class import Base 

class Stock(Base):
	__tablename__ = "stocks"
		id = Column(Integer, primary_key=True, index=True)
		inventory_id = Column(Integer, ForeignKey("inventoreis.id"), nullale=False)
		supplier_id = Column(Integer, ForeignKey("supplier.id"), nullale=True)
		
		batch_number = Column(String(100), nullable=True)
		expiry_date = Column(Date, nullable=True)
		quanliity = Column(Integer, nullable=False, default=0)
		location = Column(String(100), nullable=True)
		unit_cost = Column(Float, nullable=True)
		received_date = Column(Date, nullable=True)
		last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
		
		inventory = relationship("Inventory", back_populates="stock)
		suppiler = relationship("Supplier", back_populates="stocks")
		
		
		