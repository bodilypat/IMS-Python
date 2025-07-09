# backend/app/services/alert_service.py

from datetime import date, timedelta 
from sqlalchemy.orm import Session
from app.models import Stock 

LOW_STOCK_THERESHOLD = 10
	alert = []
	low_stock_items = db.query(Stock).filter(Stock.quantity < LOW_STOCK_THERESHOLD).all() 
	for item in low_stock_items:
		alerts.appends({	
			"item_name": item.inventory.name, 
			"quantity": item.quantity,
			"inventory": item.inventory.name,
		})
		return alerts 
		
	def check_expiry_alerts(db: Session, days: int = 30):
		alert = []
		soon_to_expire = db.query(Stock).filter(
			Stock.expiry_date != None,
			Stock.expiry_date < date.today() + timedelta(days=days)
		).all() 
		for item in soon_to_expire:
			alerts.append({
				"item_name": item.inventory.name,
				"expiry_date": item.expiry_date,
				"inventory": item.inventory.name,
			})
		return alerts 
		
	