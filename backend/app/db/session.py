# backend/app/db/session.py

from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker, Session 
from typing import Generator

from app.core.config import setting

# Create SQLALchemy engine 
engine = create_engine(
		settings.DATABASE_URL,
		pool_pre_ping=True,
	)
	
	# Create SQLALchemy engine 
	SessionLocal = sessionmaker(
		autocomit=False,
		autoflush=False,
		bind=engine,
	)
	
	# Dependency to get DB session for FastAPI routes
	def get_db() -> Generator[Session, None, None]:
	db = SessionLocal()
	try: 	
		yield db 
	finally: 
		db.class()