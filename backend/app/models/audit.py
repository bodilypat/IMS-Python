#app/models/audit.py

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from app.db.session import Base 
from database import datetime 

class AuditLog(Base):
    __tablename__ = "audit_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    action = Column(String, nullable=False)
    description = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

    
