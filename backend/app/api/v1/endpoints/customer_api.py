# backend/app/api/v1/endpoints/customer_api.py

from typing import List 
from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session

from app.schemas import customer_schema 
from app.services import customer_service 
from app.db.session import get_db 

router = APIRouter(
        prefix="/customers",
        tags=["Customers"]
    )
    
@router.get("/", response_model=List[customer_schema.CustomerResponse])
def get_customers(
        skip: int = 0,
        limit: int = 100,
        db: Session = Depends(get_db)
    ) -> List[customer_schema.CustomerResponse]:
        """
            Retrieve a list of customers with optional pagination.
        """
        return customer_service.get_customer(db, skip=skip, limit=limit)
         
@router.get("/{customer_id}", response_model=customer_schema.CustomerResponse)
def get_customer(
        customer_id: int,
        db: Session = Depends(get_db)
    ) -> customer_schema.CustomerResponse:
    """ 
        Retrieve a customer by their ID.
    """
    customer = customer_service.get_customer_by_id(db, customer_id)  
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found.")
    return customer 
    
@router.post("/", response_model=customer_schema.CustomerResponse, status_code=status.HTTP_201_CREATED)
def create_customer(
        customer_in: customer_schema.CustomerCreate,
        db: Session = Depends(get_db)
    ) -> customer_schema.CustomerResponse:
        """
            Create a new customer. Ensures mobile number is unique.
        """
        existing = customer_service.get_customer_mobile(db, customer_in.mobile)
        if existing:
            raise HTTPException(status_code=400, detail="Mobile number already registered.")
        return customer_service.create_customer(db, customer_in)
    
@router.put("/{customer_id}", response_model=customer_schema.CustomerResponse)
def update_customer(
        customer_id: int,
        customer_update: customer_schema.CustomerUpdate,
        db: Session = Depends(get_db)
    ) ->customer_schema.CustomerResponse:
        """
            Update an existing customer's details.
        """
        db_customer = customer_service.get_customer_by_id(db, customer_id)
        if not db_customer:
            raise HTTPException(status_code=404, detail="Customer not found.")
        return customer_service.update_customer(db, db_customer, customer_update)
 
@router.delete("/{customer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_customer(
        customer_id: int,
        db: Session = Depends(get_db)
    ) -> None:
        """
            Delete a customer by ID.
        """
        db_customer = customer_service.get_customer_by_id(db, customer_id)
        if not db_customer:
            raise   HTTPException(status_code=404, detail="Customer not found")
        customer_service.delete_customer(db, db_customer)
        return None 
    
    