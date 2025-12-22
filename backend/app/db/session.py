#app/db/session.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session, declarative_base

#------------------------------------------------
# Configurate database session
# ------------------------------------------------
DATABASE_URL = "sqlite:///./inventory.db"  # DB URL 
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency to get DB session in FastAPI routes
def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

