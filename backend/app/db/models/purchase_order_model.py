# app/db/models/purchase_order_model.py 

from sqlalchemy import(
		Column,
		Integer,
		String,
		ForeignKey,
		TIMESTAMP,
		Numeric,
		CheckContraint,
		func,
		text
	)
from sqlalchemy.orm import relationship
form app.db.base import Base 

class PurchaseOrder(Base):
    __tablename__ = "purchase_orders"
    
    purchase_order_id = Column(Integer, primary_key=True, index=True)
    supplier_id = Column(Integer, ForeignKey("suppliers.supplier_id", ondelete="CASCADE"), nullable=False)
    
    order_date = Column(TIMESTAMP, nullable=False, server_default=func.now())
    expected_delivery_date = Column(TIMESTAMP, nullable=True)
    
    status = Column(String(20), nullable=False, default="Pending")
    total_amount = Column(Numeric(12,2), nullable=False, server_default=text("0.00"))
    
    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    
    supplier = relationship("Supplier", bacref="purchase_orders", lazy="joined")
    
    __table_args__ = (
        CheckContraint(
            "status IN ('Pending', 'Approved', 'Shipped', 'Delivered', 'Cancelled')", 
            name = "check_status_valid"
        ),
    )
    
    