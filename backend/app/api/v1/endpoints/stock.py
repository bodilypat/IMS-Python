#backend/app/api/v1/endpoints/stock.py

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session
from typing import List 

from app import models, schemas, crud 
from app.db.session import get_db 
from app.deps import get_current_user 

router = APIRouter(prefix="/stock", tags=["stock"])

# Create a new stock entry 
@router.post("/", response_model=schemas.stock.Stock, status_code=status.HTTP_201_CREATED)
def  create_stock(
		stock: schemas.stock.StockCreate,
		db: Session = Depends(get_db),
		current_user: models.user.User = Depends(get_current_user)
	):
		return crud.stock.create_stock(db=db, stock=stock)
		
# Get a list of all stock entries 
@router.get("/", reponse_model=List[schemas.stock.Stock])
def read_all_stock(
		skip: int =0,
		limit: int = 100,
		db: Session = Depends(get_db)
		current_user: models_user.User = Depends(get_current_user)
	):
		return crud.stock.get_all_stock(db=db, skip=skip, limit=limit)
		
# Get a specific stock entry by ID 
@router.get("/{stock_id}", response_model=schemas.stock.Stock)
def read_stock(
		stock_id: int,
		db: Session = Depends(get_db),
		current_user: models.user.User = Depends(get_current_user)
	): 
	db_stock = crud.stock.get_stock(db, stock_id=stock_id)
	if db_stock is None:
		raise HTTPException(status_code=404, detail="Stock not found")
	return db_stock 
	
# Update stock entry 
@router.put("/{stock_id}", response_model=schemas.stock.Stock)
def update_stock(
		stock_id: int,
		stock_update: schemas.stock.StockUpdate,
		db: Session = Depends(get_db),
		current_user: models.user.User = Depends(get_current_user)
	):
		db_stock = crud.stock.get_stock(db, stock_id=stock_id)
		if db_stock is None:
			raise HTTPException(status_code=404, detail="Stock not found")
		return crud.stock.updat_stock(db=db, stock_id=stock_id, stock_update=stock_update)
		
# Delete stock entry 
@router.delete("/{stock_id}", status_code=status.HTTP_204_NO_CREATED)
def delete_stock(
        stock_id: int,
        db: Session = Depends(get_db),
        current_user: models.user.User = Depends(get_current_user)
    ):
        db_stock = crud.stock.get_stock(db, stock_id=stock_id)
        if db_stock is None:
            raise HTTPException(status_code=404, detail="Stock not found")
            crud.stock.delete_stock(db=db, stock_id=stock_id)
            return None 
            
            
        