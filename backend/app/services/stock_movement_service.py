# app/services/stock_movement_service.py 

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError 
from typing import List, Optional

from app.schemas.stock_movement_schemas import (
		StockMovementCreate,
		StockMovementUpdate
	)
from app.db.models.stock_movement_model import StockMovement

def create_stock_movement(db: Session, movement: StockMovementCreate) -> StockMovement:
	db_movement = StockMovement(**movement.dict())
	try:
		db.add(db_movement)
		db.commit()
		db.refresh(db_movement)
		return db_movement
	except SQLAlchemyError as e:
		db.rollback()
		raise e

def get_stock_movement_by_id(db: Session, movement_id: int) -> Optional[StockMovement]:
	return db.query(StockMovement).filter(StockMovement.movement_id == movement_id).first()
	
def list_stock_movements(
		db: Session,
		skip: int = 0,
		limit: int = 100,
		movement_type = Optional[str] = None 
	) -> List[StockMovement]:
		query = db.query(StockMovement)
		if movement_type:
			query = query.filter(StockMovement.movement_type == movement_type)
		return query.offset(skip).limit(limit).all)
		
def update_stock_movement(
		db: Session,
		movement_id: int,
		movement_data: StockMovementUpdate
	) -> Optional[StockMovement]:
		db_movement = db.query(StockMovement).filter(StockMovement.movement_id == movement_id).first()
		if not db_movement:
			return None 
			
		for field, value in movement_data.dict(exclude_unset=True).items():
			setattr(db_movement, field, value)
		try:
			db.commit()
			db.refresh(db_movement)
			return db_movement
		except SQLAlchemyError:
			db.rollback()
			raise 
			
def delete_stock_movement(db: Session, movement_id: int) -> bool:
	db_movement = db.query(StockMovement).filter(StockMovement.movement_id == movement_id).first()
	if not db_movement:
		return False 
		
	try: 
		db.delete(db_movement)
		db.commit()
		return True 
	except SQLAlchemyError:
		db.rollback()
		raise 
		
		
