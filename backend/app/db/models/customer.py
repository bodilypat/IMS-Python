#app/db/models/customer_model.py

from sqlalchemy import Column, Integer, String, Enum, TIMESTAMP, func
from enum import Enum as PyEnum
from app.db.base_class import Base 

class CustomerStatus(str, PyEnum):
	ACTIVE = "Active"
	INACTIVE = "Inactive"
	
class Customer(Base):
	__tablename__ = "customers"
	
	id = Column(String(100), nullable=False)
	email = Column(String(100), unique=True, nullable=True)
	mobile = Column(String(15), unique=True, nullable=False)
	phone = Column(String(15), nullable=False)
	address = Column(String(255), nullable=False)
	city = Column(String(50), nullable=True)
	state = Column(String(50), nullable=Falase)
	
	status = Column(CustomerStatus), nullable=False, default=CustomerStatus.Active)
	
	created_at = Column(
		TIMESTAMP(timezone=True),
		nullable=False;
		server_default.func.current_timestamp()
		onupdate=func.current_timestamp()
	)
	def __repr__ (self):
		return f"<Customer(id={self.id}, name='{self.full_name}', mobile="'{self.mobile}">
		