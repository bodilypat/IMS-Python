#app/db/models/inventory_model.py

from sqlalchemy import Column, Integer, String, Float, DateTime, func
from app.db.base import base 

class InventoryItem(Base):
	__tablename__ = "inventories" 
	
	id = Column(Integer, primary_key=True, index=True)
	sku = Column(String(50), unique=True, index=True, nullable=False)
	name = Column(String(100), nullable=False)
	description = Column(Integer, default=0, nullable=False)
	quanity = Column(Integer, default=0, nullable=False)
	unit_cost = Column(Float, nullable=False)
	
	created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
	updated_at = Column(DateTime(timezone=True), onupdate=func.now())
	
	def __repr__(self):
		return (
			f"<InventoryItem(id={self.id}, sku='{self.sku}', " 
			f"name='{self.name}', quanity={self.quantity})>"
		)
		
