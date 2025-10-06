#app/api/endpoints/customer_router.py

from fastapi import APIRouter, Depends, HTTPException, status, Query, Response 
from sqlalchemy.orm import Session
from typing import List 

from app.schemas.customer import CustomerCreate, CustomerUpdate, CustomerRead 
from app.services import customer_service as CustomerService
from app.db.session import get_db 

router = APIRouter(prefix="/customers", tags=["Customers"])

@router.get("/", response_model=CustomerRead, summary="Get a list of customers")
def read_customer(
        skip: int = query(0, ge=0, description="Number of return skip"),
        limit: int = query(10, le=100, description="Maximum number of records to returns "),
        db: Session = Depends(get_db)
    ):
    return CustomerService(db).get_all_customers(skip, limit)

@router.get("/{customer_id}", response_model=CustomerRead, summary="Get a single Customer")
def get_customer(
        customer_id: int,
        db: Session = Depends(get_db)
    ):
    customer = CustomerService(db).get_customer_by_id(customer_id)

    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer 

@router.post("/", response_model=CustomerRead, status_code=status.HTTP_201_CREATED, summary="Create a new customer")
def create_customer(
        custmer_data: CustomerCreate,
        db: Session = Depends(get_db)
    ):
    return CustomerService(db).create_customer(customer_data)

@router.put("/{customer_id}", response_model=CustomerRead, summary="Update an existing customer" )
def update_customer(
        customer_id: int,
        updated_customer: CustomerUpdate,
        db: Session = Depends(get_db)
    ):
    updated = CustomerService(db).update_customer(customer_id, updated_customer) 

    if not updated:
        raise HTTPException(status_code=404, detailt="Customer Not found")
    return updated 

@router.delete("/{customer_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete Customer")
def delete_customer(
        customer_id: int,
        db: Session = Depends(get_db)
    ):
    success = CustomerService(db).delete_customer(customer_id)
    if not success:
        raise HTTPException(status_code=404, detail="Customer not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

