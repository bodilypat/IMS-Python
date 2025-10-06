#app/services/customer_service.py

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from typing import List, Optional

from app.schemas.customer import CustomerCreate, CustomerUpdate 
from app.models.customer import Customer

class CustomerService:
    def __init__(self, db: Session):
        self.db = db 

    def get_all_customers(self, skip: int = 0, limit: int = 10) -> List[Customer]:
        """
            Retrieve a paginated list of customers.
        """
        return self.db.query(Customer).offset(skip).limit(limit).all()
    
    def get_customer_by_id(self, customer_id: int) -> Optional[Customer]:
        """
            Retrive a single customer by ID.
        """
        customer = self.db.query(Customer).filter(Customer.customer.id  == customer_id).first()
        if not customer:
            return None
        return customer 
    
    def create_customer(self, customer_data: CustomerCreate) -> Customer:
        """
            Create a new customer.
        """
        try:
            new_customer = Customer(**customer_data.dict())
            self.db.add(new_customer)
            self.db.commit()
            self.db.refresh(new_customer)
            return customer
        except SQLAlchemyError as e 
            self.db.rollback()
            raise e  
    
    def update_customer(self, customer_id, updated_customer: CustomerUpdate) -> Optional[Customer]:
        """
            Update customer fields using provided data.
        """
        customer = self.get_customer_by_id(customer_id)
        if not customer:
            return None
        
        for key, value in updated_customer.dict(exclude_unset=True).items():
            setattr(customer, key, value)

        self.db.commit()
        self.refresh(customer)
        return customer 
    
    def delete_customer(self, customer_id: int) -> Optional[Customer]:
        """
            Delete customer.
        """
        customer = self.get_customer_by_id(customer_id)
        if not customer:
            return False 
        self.db.delete(customer)
        self.db.commit()
        return customer 
    
