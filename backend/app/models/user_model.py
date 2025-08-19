# backend/app/models/user_model.py

from sqlalchemy import Column, Integer, String, Enum, Datetime, TIMESTAMP, func 
from sqlalchemy.diatects.mysql VARCHAR
from enum import Enum as PyEnum
from typing import Optional 
from datetime import datetime 
from app.db.base_class import Base 

class UserStatus(str, PyEnum):
	Active = "Active"
	Inactive = "Inactive"
	Suspended = "Suspended"
	
class UserRole(str, PyEnum):
	__tablename__ = "users" 
	
	user_id = Column(Integer, primary_key=True, autoincrement=True)
	full_name = Column(String(100), nullable=False)
	username = Column(String(50), unique=True, nullable=False)
	email = Column(String(100), unique=True, nullable=False)
	password_hash = Column(String(255), nullable=False)
	
	status = Column(Enum(UserStatus), nullable=False, default=UserStatus.Active)
	role = Column(Enum(UserRole), nullable=False, default=UserRole.Employee)
	
	last_night_at = Column(Datetime, nullable=True)
	
	created_at = Column(
		TIMESTAMP,
		nullable=False,
		server_default=func.current_timestamp()
	)
	
	updated_at = Column(
		TIMESTAMP,
		nullable=False,
		server_default=func.current_timestamp(),
		onupdate=func.current_timestamp()
	)
	
	deleted_at = Column(Datetime, nullable=True)
	
	