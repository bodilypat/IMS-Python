#app/models/user.py

import enum
from datetime import datetime 
from sqlalchemy import (Column, Integer, String, Text, Enum, Datetime, func)
from sqlalchemy.ext.declarative import declarative_base 
from sqlalchemy.orm import validates 
from sqlalchemy.sql import expression 
from sqlchemy.dialects.postgresql import TIMESTAMP

base = declarative_base()

# Enum definitions
class UserStatus(enum.Enum):
		active = 'active'
		inactive ='inactive'
		suspended = 'suspended'
		
class UserRole(enum.Enum):
	admin = 'admin'
	manager = 'manager'
	employee = 'employee'
	
class User(Base):
	__tablename__ = "users"
	
	user_id = Column(Integer, primary_key=True, autoincrement=True)
	
	full_name = Column(String(100), nullable=False)
	username = Column(String(50), unique=True, nullable=False)
	email = Column(String(255), unique=True, nullable=False)
	password_hash = Column(Text, nullable=False)
	
	status = Column(Enum(UserStatus, name="user_status", nullable=False, default=UserStatus.active)
	role = Column(Enum(UserRole, name="user_role"), nullable=False, default=UserRole.employee)
	
	last_login_at = Column(TIMESTAMP(timezone=True), nullable=True)
	created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now())
	updated_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())
	
	# Optional: email format validation
	@validates('email')
	def validate_email(self, key, address):
		import re
		if not re.match(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$", address):
			raise ValueError("Invalid email format")
		return address
	
	def __repr__(self):
		return f"<User(user_id={self.user_id}, username={self.username}, email={self.email}, role={self.role.value})>"
		
	
	
	