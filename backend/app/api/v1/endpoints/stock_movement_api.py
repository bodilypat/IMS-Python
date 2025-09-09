#app/api/v1/endpoints/stock_movement_api.py 

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from import List , Optional

from app.schemas.stock_movement_schema import ( 
		StockMovementCreate, 
		StockMovementRead,
		StockMovementUpdate
	)
from app.services.stock_movement_service import (
		create_stock_movement,
		get_stock_movement_by_id,
		list_stock_movements,
		update_stock_movement,
		delete_stock_movement
	)
from app.db.session import SessionLocal

	router = APIRouter(
		prefix="/stock_movements",
		tags=["Stock Movements"]
	)
	
# Dependancy to get DB session
def get_db():
	db = SessionLocal()
		try:
			yield db 
		finally:
			db.close() 
			
# Create a new stock movement 
@router.post("/", response_model=StockMovementRead, status_code=status.HTTP_201_CREATED)
def create_new_stock_movement(
		movement: StockMovementCreate,
		db: Session = Depends(get_db)
	):
        return create_stock_movement(db=db, movement=movement)
        
# get stock by ID
@router.get("/{movement_id}", response_model=StockMovementRead)
def get_movement_by_id(
        movement_id: int,
        db: Session = Depends(get_db)
    ):
    movement = get_stock_movement_by_id(db=db, movement_id=movement_id)
    if not movement:
        raise HTTPException(status_code=404, detail="Stock movement not found")
    return movement 
    
# List all stock movements with optional filters and pagination
@router.get("/", response_model=List[StockMovementRead])
def list_all_movements(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, get=1, le=100),
    movement_type: Optional[str] = Query(None, regex="^(IN|OUT)$"),
    db: Session = Depends(get_db)
    ):
        return list_stock_movements(db=db, skip=skip, limit=limit, movement_type=movement_type)
        
# Update an existing stock movement 
@router.put("/{movement_id}", response_model=StockMovementRead)
def update_movement(
        movement_id: int,
        movement_data: StockMovementUpdate,
        db: Session = Depends(get_db)
    ):
        movement = update_stock_movement(db=db, movement_id=movement_id, movement_data=movement_data)
        if not movement:
            raise HTTPException(status_code=404, detail="Stock movement not found")
        return movement 
        
# Delete a stock movement 
@router.delete("/{movement_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_movement(
        movement_id: int,
        db: Session = Depends(get_db)
    ):
        success = delete_stock_movement(db=db, movement_id=movement_id)
        if not success:
            raise HTTPException(status_code=404, detail="Stock movement not found")
        return None 
        
     