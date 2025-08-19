# backend/app/api/v1/endpoints/customer_api.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session 
from typing import List 

from app.schema import customer_schema 
from app.models import customer_model
from app.db.session import get_db 
from app.crud import customer_crud 

router = APIRouter(
		prefix="/customers",
		tags=["Customers"]
	)
	
	@router.get("/", response_model=List[customer_schema.CustomerResponse])
	def get_customers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
		return customer_crud.get_customers(db, skip=skip, limit=limit)
		
	@router.get("/{customer_id}", response_model=customer_schema.CustomerResponse)
	def get_customer(customer_id: int, db: Session = Depends(get_db)):
		customer = customer_crud.get_customer_by_id(db, customer_id)
		if not customer:
			raise HTTPException(status_code=404, detail="Customer not found")
		return customer 
		
	@router.post("/", response_model=customer_schema.CustomerResponse, status_code=status.HTTP_201_CREATED)
	def create_customer(customer_in: customer_schema.CustomerCreate, db: Session = Depends(get_db)):
		existing = customer_crud.get_customer_by_mobile(db, customer_in.mobile)
		if existing:
			raise HTTPException(status_code=400, detail="Mobile number already registered")
		return customer_crud.create_customer(db, customer_in)
		
	@router.put("/{customer_id}", response_model=customer_schema.CustomerResponse)
	def update_customer(customer_id: int, customer_update: customer_schema.CustomerUpdate, db: Session = Depends(get_db)):
		db_customer = customer_crud.get_customer_by_id(db, customer_id)
		if not db_customer:
			raise HTTPException(status_code=404, detail="Customer not found")
		return customer_crud.update_customer(db, db_customer, customer_update)
		
	@router.delete("/{customer_id}", status_code=status.HTTP_204_NO_CONTENT)
	def delete_customer(customer_id: int, db: Session = Depends(get_db)):
		db_customer = customer_crud.get_customer_by_id(db, customer_id)
		if not db_customer:
			raise HTTPException(status_code=404, detail="Customer not found")
		customer_crud.delete_customer(db, db_customer)