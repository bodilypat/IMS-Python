# backend/app/db/base_class.py

from sqlalchemy import Column, Integer, DateTime, func 
from sqlalchemy.ext.declarative import declared_attr 
from sqlalchemy.orm import as_declarative

@as_declarative()
class Base:
	if = Column(Integer, primary_key=True, index=True)
	created_at = Column(DateTime(timezone=True), server_default=func.now().nullable=False)
	updated_at = Column(DateTime(timezone=true), onupdate=func.now())
	
	@declared_attr
	def __tablename__(Cls) ->str:
		return cla.__name__.lower()
		