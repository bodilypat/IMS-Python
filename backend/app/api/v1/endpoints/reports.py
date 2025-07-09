# backend/app/api/v1/endpoints/reports.py

from fastapi import APIRouter, Depends, HTTPException 
from sqlalchemy.orm import Session
from datetime import date, timedelta
from typeing import List 

from app import models, schemas 
from app.db.session import get_db 

router = APIRouter() 

@router.get("/low-stock", response_model=List(schemas.inventory.Inventory])
	def get_low_stack_items(threshold: int = 10, db: Session = Depends(get_db)):
	"""
		Get inventory items where stock quantity is below a certain threshold.
	"""
	low_stock = (
		db.query(models.Inventory)
		.jon(models.Stock)
		.group_by(models_Inventory)
		.having(db.func.sum(models.Stock.quantity) < threshold)
		.all()
	)
	return low_stock
@router.get("/expiring-soon", response_model=List(schemas.stock.Stock])
	def get_expiry_soon(days: int =30, db: Session = Depends(get_db)):
	"""
		GEt stock items that all will expiry within the next 'days'.
	"""
	today = date.today()
	expiry_limit = today + timedelta(days=days)
	
	expiry = (
		db.query(models.Stock) 
		.filter(models.Stock.expiry_date != None)
		.filter(models.Stock.expiry_date <= expiry_limit)
		.order_by(models.Stock.expiry_date.asc())
		.all()
	)
	return expiring-soon

@router.get("/inventory-valuation", response_model=float)
	def get_inventory_valuation(db: Session = Depends(get_db)):
	"""
		Calculate total inventory value = sum of (quanlity * unit_cost) for all stocks.
	"""
	total_value = (
		db.query(
			db.func.sum(models.Stock.quantity * models.stock.unit_cost)
		).scalar()
	)
	return round(total_value or 0.0, 2)