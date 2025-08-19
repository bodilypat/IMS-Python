#backend/app/models/customer_model.py

from sqlalchemy import Column, Integer, String, Enum, TIMESTAMP, func 
from enum import enum as PyEnum 
from typing import Optional
from app.db.base_class import Base 

class CustomerStatus(str, PyEnum):
	Active = "Active"
	Inactive = "Inactive"
	
class Customer(Base):
	__tablename__ = "customers"
	
	customer_id = Column(Integer, primary_key=True, autoincrement=True)
	full_name = Column(String(100), nullable=False)
	email = Column(String(100), unique=True, nullable=True)
	mobile = Column(String(15), unique=True, nullable=False)
	phone = Column(String(15), nullable=True)
	address = Column(String(255), nullable=False)
	city = Column(String(50), nullable=True)
	state = Column(String(50), nullable=False)
	status = Column(Enum(CustomerStatus), nullable=False, default=CustomerStatus.Active)
	
	created_at = Column(
		TIMESTAMP,
		nullable=False,
		server_default=func.current_timestamp()
	)
	
	