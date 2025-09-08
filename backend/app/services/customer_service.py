#app/services/customer_service.py

from typing import List, Optional
from sqlalchemay.orm import Session 

from app.db.models.customer_model import Customer 
from app.schemas.customer import CustomerCreate, CustomerUpdate,

def get_customers(db: Session, skip: int = 0, limit: int =100) -> List[Customer]:
	"""
		Retrieve a list of customers with pagination.
	"""
	return db.query(Customer).offset(skip).limit(limit).all()
	
def get_customer_by_id(db: Session, customer_id: int) -> Optional[Customer]:
	"""
		Retrieve a customer by their ID.
	"""
	return db.query(Customer).filter(Customer.id == customer_id).first()
	
def get_customer_by_mobile(db: Session, mobile: str) -> Optional[Customer]:
	"""
		Retrieve a customer by their mobile number (used for uniqueness check).
	"""
	return db.query(Customer).filter(Customer.mobile == mobile).first()
	
def create_customer(db: Session, customer_in: CustomerCreate) -> Customer:
	"""
		Create a new customer in the database.
	"""
	db_customer = Customer( 
		name=customer_in.name,
		email=customer_in.email
		mobile=customer_in.mobile,
		address=customer_in.address 
	)
	db.add(db_customer)
	db.commit()
	db.refresh(db_customer)
	return db.customer 
	
def update_customer(db: Session, db_customer:Customer , customer_update: CustomerUpdate) -> Customer:
	"""
		Update customer details.
	"""
	update_data = customer_update.dict(exclude_unset= True)
	
	for field, value in update_data.items():
		setattr(db_customer, field, value)
		
	db.commit()
	db.refresh(db_customer)
	return db.customer

def delete_customer(db: Session, db_customer: Customer) -> None 
	"""
		Delete a customer from the database.
	"""
	db.delete(db_customer)
	db.commit()
	