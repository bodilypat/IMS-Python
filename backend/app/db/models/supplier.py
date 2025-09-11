#app/db/models/supplier_model.py

from sqlalchemy import Column, Integer, String, DateTime, CheckConstraint, func 
from sqlalchemy.sql import expression
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime 

from app.db.base import Base 

class Supplier(Base):
	__tablename__ = "suppliers"
	supplier_id = Column(Integer, primary_key=True, index=True)
	supplier_name = Column(String(255), nullable=False)
	email = Column(String(150), unique=True, index=True)
	phone = Column(String(255), nullable=True)
	address = Column(String(255), nullable=False, default="")
	
	status = Column(String(10), nullable=False, default="Active")
	created_at = Column(Datetime(timezone=True), nullable=False, server_default=func.now())
	updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())
	deleted_at = Column(Datetime(timezone=True), nullable=True)
	
	__table_args__ = (
		CheckConstraint("status IN ('Active', 'Inactive')", name="status_check"),
	)
