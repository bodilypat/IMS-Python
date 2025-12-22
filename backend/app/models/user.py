#app/models/user.py 

from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from app.database import Base
from app.core.sercurity import get_password_hash

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="staff", nullable=False) # admin / staff

    email = Column(String, unique=True, index=True, nullable=False)

    full_name = Column(String, nullable=True)
    age = Column(Integer, nullable=True)
    weight = Column(Float, nullable=True)
    height = Column(Float, nullable=True)

    posts = relationship("Post", back_populates="owner")

    def set_password(self, password: str):
        self.hashed_password = get_password_hash(password)
