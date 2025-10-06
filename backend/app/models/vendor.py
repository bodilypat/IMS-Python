#app/models/vendor.py

from sqlalchemy import Column, Integer, String, Text, DateTime 
from sqlalchemy.sql import func 
from app.db import Base 

class Vendor(Base):
    __tablename__= "vendors"

    vendor_id: Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    contact_email = Column(String(255), nullable=True)
    address = Column(Text, nullable=True)

# Timestamps
created_At = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func().now(), nullable=False)

def __repr__(self):
    return f"<Vendor id={self.vendor_id}, name='{self.name}'>"

