#app/models/supplier.py

from sqlalchemy import ( 
        Column, 
        Integer,  
        String,  
        Text,
        Boolean,
        DateTime,
        func,
        CheckConstraint, 
)
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Supplier(Base):
    __tablename__= "suppliers"

    supplier_id = Column(Integer, primary_key, index=True)

    supplier_name = Column(String(255), nullable=False)
    contact_person = Column(String(255), nullable=True)
    contact_email = Column(String(255), unique=True, nullable=True)
    contact_phone = Column(String(20), nullable=True)

    address = Column(Text, nullable=True)

    # ACTIVE/ INACTIVE 
    status = Column(
        String(50), 
        nullable=False,
        default="active"
    ) 

    # Timestamps 
    created_at = Column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        onupdate=func.now(), 
        nullable=False
    )

    # Soft Delete
    is_deleted = Column(Boolean, default=False, nullable=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    __table_args__ = (
        CheckConstraint("status IN('Active', 'Inactive')", name="chk_supplier_status") 
    ),

    def __repr__(self):
        return f"<Supplier id={self.supplier_id}, name='{self.supplier_name}'> "
    



# Timestamp 
  