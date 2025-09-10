#app/api/v1/router.py

from fastapi import APIRouter
from app.api.v1.endpoints import (
		auth_api,
		product_api,
		supplier_api,
		customer_api,
		purchase_order_api,
        purchase_order_item_api,
		sales_order_api,
		sale_order_item_api,
		stock_movement_api,
		inventory_api, 
		report_api,
	)
	
	api_router.include(auth_api.router, prefix="/auth", tags=["Auth"])
	api_router.include(product_api.router, prefix="/products", tags=["Products"])
	api_router.include(supplier_api.router, prefix="/suppliers", tags=["Suppliers"])
    api_router.include(customer_api.router, prefix="/customers", tags=["Customers"])
    api_router.include(purchase_order_api.router, prefix="/purchase-orders", tags=["Purchase Orders"])
    api_router.include(purchase_order_item_api.router, prefix="/purchase-order-items", tags=["Purchase Order Items"])
    api_router.include(sales_order_api.router, prefix="/sales-orders", tags=["Sales Orders"])
    api_rotuer.include(sale_order_item_api.router, prefix="/sale-order-items", tags=["Sale Order Item"])
    api_router.include(stock_movement_api.router, prefix="/stock", tags=["Stock Movements"])
    api_router.include(inventory_api.router, prefix="/inventory", tags=["Inventory"])
    api_router.include(report_api.router, prefix="/reports", tags=["Reports"])
    