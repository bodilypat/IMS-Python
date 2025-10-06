#app/models/category.py

from sqlalchemy import Column, Integer, String, Text, DateTime 
from sqlalchemy.sql import func
from app.db import Base 

class Category(Base):
    __tablename__= "categories"

    category_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100),naullable=False, unique=True)
    description = Column(Text, nullable=True)

# Timestamps 
created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

def __repr__(self):
    return f"<Category_id={self.category_id}, name='{self.name}'>"