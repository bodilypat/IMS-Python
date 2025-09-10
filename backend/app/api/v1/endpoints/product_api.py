#app/api/v1/endpoints/product_api.py

from typing import List 
from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session

from app.schemas import product_schema
from app.services import product_service
from app.db_session import get_db 

router = APIRouter(
		prefix="/products",
		tags=["Products"]
	)
	
@router.get("/", response_model=List[product_schema.ProductResponse])
def get_products(
		skip: int = 0,
		limit: int = 100,
		db: Session = Depends(get_db)
	) -> List[product_schema.ProductResponse]:
		"""
			Retrieve a list of products.
		"""
		return product_service.get_products(db, skip=skip, limit=limit)

@router.get("/{product_id}", response_model=product_schema.ProductResponse)
def get_product_by_id(
		product_id: int,
		db: Session = Depends(get_db)
	) -> product_schema.ProductResponse:
		"""
			Retrieve a product by its ID.
		"""
		product = product_service.get_product_by_id(db, product_id)
		if not product:
			raise HTTPException(status_code=404, detail="Product not found")
		return product 
		
@router.post("/", response_model=product_schema.ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(
		product_in: product_schema.ProductResponse,
		db: Session = Depends(get_db)
	) -> product_schema.ProductResponse:
		"""
			Create a new product.
		"""
		existing = product_service.get_product_by_sku(db, product_in, sku)
		if existing:
			raise HTTPException(status_code=400, detail="SKU already exists.")
		return product.create_product(db, product_id)
		
@router.put("/{product_id}", response_model=product_schema.ProductResponse)
def update_product(
		product_id: int,
		product_update: product_schema.ProductUpdate,
		db: Session = Depends(get_db)
	) -> product_schema.ProductResponse:
		"""
			Update a product's information.
		"""
		db_product = product_service.get_product_by_id(db, product_id)
		if not db_product:
			raise HTTPException(status_code=404, detail="Product not found.")
		return product_service.update_product(db, db_productp, product_update)
		
@router.delete("{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
		product_id: int,
		db: Session = Depends(get_db)
	) -> None 
		"""
			Soft delete a product by marking 'deleted_at'.
		"""
		db_product = product_service.get_product_by_id(db, product_id)
		if not db_product:
			raise HTTPException(status_code=404, detail="Product not found.")
		product_service.soft_delete_productt(db, db_product)
		return None 
		
		