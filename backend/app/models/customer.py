#app/models/customer.py

from sqlalchemy import Column, Integer, String, Text, DateTime 
from sqlalchemy.sql import func 
from app.db.base import 

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False, index=True)
    contact_email = Column(String(255), nullable=False, unique=True, index=True)
    phone = Column(String(20), nullable=True)
    address = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    def __repr__(self):
        return f"<Customer id={self.id} name={self.name} email={self.contact_email}>"
    
    