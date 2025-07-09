# backend/app/db/base.py

from sqlalchemy.ext.declarative import declarative_base 

Base = declarative_base()

# Import all models  here to register thm with SQLALchemay's metadata 
from app.models import user, inventory, stock, supplier

