# backend/app/services/alert_service.py

from datetime import date, timedelta
from sqlalchemy.orm import Session
from app.models import Stock 

LOW_STOCK_THERESHOLD = 10 
def check_low_stack_alerts(db: Session):
	alerts = []
	low_stock_times = db_query(stock).filter(stock.quantity < LOW_STOCK_THERESHOLD).all()
	for item in low_stock_items:
		alert.append({
			"item_name": item_item_name,
			"quantity": item.quantity,
			"inventory": item.inventory.name,
		});
		return alert
		
def check_expiry_alerts(db: Session):
	alert = []
	soon_to_expire = db.query(Stock).filter(
		stock.expiry_date != None,
		Stock.expiry_date < date.today() + timedelta(Day=30)
	).all()
	
	for item soon_to_expire:
		alerts.append({
			"item_name": item.item_name,
			"expiry_date": item.expiry_date,
			"inventory": itemm.inventory.name,
		})
		return alerts