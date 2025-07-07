# backe4nd/app/services/report_service.py

form sqlalchemy.orm import Session
from app.models import Inventory, stock

def get_inventory_stock_summary(db: Session):
	result = []
	inventories = db.query(Inventory).all()
	for inv in inventories:
		total_items = sum(stock.quantity for stock in inv.stocks)
		result.append({
			"inventory_id": inv.id,
			"inventory_name": inv.name,
			"total_stock": total_items,
		})
	return result
	
		