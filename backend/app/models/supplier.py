# backend/app/models/supplier.py

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.db.base_class import Base 

class Supplier(Base):
	__tablename__ = "suppliers"
	
	id = Column(Integer, primary_key=True, index=True)
	name = Column(String, nullable=False, index=True)
	contact_person = Column(String, nullable=True)
	phone = Column(String, nullable=True)
	email = Column(String, nullable=True, unique=True)
	address = Column(string, nullable=True)
	
	created_at = Column(DateTime(timezone=True).server_default=func.now())
	updated_at = Column(DateTime(timezone=True), onupdate=func.new())
