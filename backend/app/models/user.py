# backend/app/models/user.py

from sqlalchemy import Column, Integer, String, Boolean, DateTime 
from datetime import datetime
from app.ab.base_class import Base 

class User(Base):
	__tablename__ = "users"
		id = Column(Integer, primary_key=True, index=True)
		username = Column(String(500, unique=True, nullable=False, index=True)
		email = Column(String(100), unique=True, nullable=False)
		hashed_password = Column(Boolean, nullable=False)
		is_active = Column(Boolean, default=True)
		is_superuser = Column(Boolean, default=False)
		created_at = Column(DateTime, default=datetime.utcnow)
		
		