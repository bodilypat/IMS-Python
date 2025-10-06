Full-Stack-Inventory-Management-System-Directory-Structure/
├── backend/
│   ├── app/                              
│   │   ├── api/                                      # FastAPI endpoints (routes/controllers)
│   │   │   ├── endpoints/
│   │   │   │	├── product_router.py
│   │   │   │	├── supplier_router.py
│   │   │   │	├── customer_router.py
│   │   │   │	├── product_router.py
│   │   │   │	├── purchase_order_router.py
│   │   │   │	├── purchase_order_item_router.py
│   │   │   │	├── sale_order_router.py
│   │   │   │	├── sale_order_item_router.py
│   │   │   │	├── Inventory_movement_router.py
│   │   │   │	├── inventory_transaction_router.py
│   │   │   │   └── __init__.py
│   │   │   ├── router.py
│   │   │   └── __init__.py                         
│   │   │                   
│   │   ├── core/                                    # App core config, security, startup logic
│   │   │   ├── config.py                      
│   │   │   ├── security.py         
│   │   │   └── __init__.py  
│   │   ├── db/                                      
│   │   │   ├── base.py                              # Declarative base, metadata
│   │   │   ├── session.py                           # SessionLocal and engine
│   │   │   ├── models/
│   │   │   │   ├── product.py
│   │   │   │   ├── supplier.py
│   │   │   │   ├── customer.py
│   │   │   │   ├── purchase_order.py
│   │   │   │   ├── purchase_order_item.py
│   │   │   │   ├── sale_order.py
│   │   │   │   ├── sale_order_item.py
│   │   │   │   ├── inventory_movement.py
│   │   │   │   ├── inventory_transaction.py
│   │   │   │   └── __init__.py 
│   │   │   └── __init__.py        
│   │   │                     
│   │   ├── schemas/                                 # Pydantic schemas for request/response validation 
│   │   │   ├── product.py
│   │   │   ├── supplier.py
│   │   │   ├── customer.py			
│   │   │   ├── purchase_order.py			          
│   │   │   ├── purchase_order_item.py	
│   │   │   ├── sale_order_item.py                        
│   │   │   ├── sale_order.py       
│   │   │   ├── inventory_movement.py
│   │   │   ├── inventory_transaction.py       
│   │   │   └── __init__.py 
│   │   │    
│   │   ├── services/                                # Business logic
│   │   │   ├── product_service.py
│   │   │   ├── supplier_service.py
│   │   │   ├── customer_service.py
│   │   │   ├── purchase_order_service.py
│   │   │   ├── purchase_order_item_service.py
│   │   │   ├── sale_order_service.py
│   │   │   ├── sale_order_item_service.py
│   │   │   ├── inventory_movement_service.py
│   │   │   ├── inventory_transaction_service.py
│   │   │   └── __init__.py   
│   │   │  
│   │   ├── dependencies.py	                            # Shared route dependencies
│   │   ├── main.py	                                    # FastAPI app entry point
│   │   ├── alembic/                               
│   │   │   ├── version/                          
│   │   │   ├── env.py         
│   │   │   └── script.py  	
│   │   ├── tests/                                      # Test suite
│   │   │   ├── api/                       
│   │   │   ├── db/    
│   │   │   ├── service/     
│   │   │   └── __init__.py  						
│   │   └── requirement.txt                                                                      
│   │
├── frontend/( with JavaScript, HTML, CSS)
│   ├── assets/
│   │   ├── img/
│   │   │   └── logo.png
│   │   ├── icons/
│   │   │   └── inventory.svg
│   ├── css/                                     # All stylesheets
│   │   ├── base.css                             # Reset and base styles
│   │   ├── layout.css                           # Grid, flexbox layouts
│   │   ├── components.css                       # UI components: buttons, forms
│   │   └── page.css                             # Page-specific styles
│   ├── js/                                      # JavaScript Logic
│   │   ├── api/                                 # API interaction layer
│   │   │   ├── auth.js                      
│   │   │   ├── inventory.js                      
│   │   │   ├── suppliers.js                      
│   │   │   └── stock.js
│   │   ├── components/                         # Reuseable DOM component creators 
│   │   │   ├── navbar.js                      
│   │   │   ├── table.js                                     
│   │   │   └── model.js
│   │   ├── pages/                              # Page logic/scripts
│   │   │   ├── dashboard.js                      
│   │   │   ├── login.js                      
│   │   │   ├── inventory.js  
│   │   │   ├── suppliers.js                           
│   │   │   └── stock.js
│   │   ├── utils/                              # Helper functions
│   │   │   ├── formValidator.js                      
│   │   │   ├── tokenManager.js                                 
│   │   │   └── domUtils.js
│   │   │
│   │   └── main.js                    		    # App initializer and routing logic
│   │
│   ├── html/                           		# All HTML pages
│   │   ├── index.html                  		# Login / Landing page
│   │   ├── dashboard.html
│   │   ├── inventory.html
│   │   ├── suppliers.htm
│   │   └── stock.html
│   │
│   ├── .env                                    # environment variables (for devs, optional)
│   ├── .README.md                              # Project instructions
│   └── package.json                            # If using build tools or npm package (optional)
├── .env                                        
├── requirements.txt                            
├── docker-compose.json                         
└── README.md                                  