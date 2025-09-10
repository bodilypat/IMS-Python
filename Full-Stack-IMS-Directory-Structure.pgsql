Full-Stack-Inventory-Management-System-Directory-Structure/
├── backend/
│   ├── app/                              
│   │   ├── api/                                      # FastAPI endpoints (routes/controllers)
│   │   │   └── v1/
│   │   │       ├── endpoints/
│   │   │   	│	├── auth_api.py
│   │   │   	│	├── product_api.py
│   │   │   	│	├── supplier_api.py
│   │   │   	│	├── customer_api.py
│   │   │   	│	├── purchase_order_api.py
│   │   │   	│	├── purchase_order_item_api.py
│   │   │   	│	├── sales_order_api.py
│   │   │   	│	├── sale_order_item_api.py
│   │   │   	│	├── stock_movement_api.py
│   │   │   	│	├── inventory_.py
│   │   │   	│	├── reports_api.py
│   │   │       │   └── __init__.py
│   │   │       ├── router.py
│   │   │       └── __init__.py                         
│   │   │                   
│   │   ├── core/                                    # App core config, security, startup logic
│   │   │   ├── config.py                      
│   │   │   ├── security.py         
│   │   │   └── __init__.py  
│   │   ├── db/                                      
│   │   │   ├── base.py                              # Declarative base, metadata
│   │   │   ├── session.py                           # SessionLocal and engine
│   │   │   ├── models/
│   │   │   │   ├── user_model.py
│   │   │   │   ├── product_model.py
│   │   │   │   ├── supplier_model.py
│   │   │   │   ├── customer_model.py
│   │   │   │   ├── purchase_order_model.py
│   │   │   │   ├── sales_order_model.py
│   │   │   │   ├── order_item_model.py
│   │   │   │   ├── inventory_model.py
│   │   │   │   ├── stock_movement_model.py
│   │   │   │   └── __init__.py 
│   │   │   └── __init__.py        
│   │   │                     
│   │   ├── schemas/                               # Pydantic schemas for request/response validation 
│   │   │   ├── user_schema.py
│   │   │   ├── product_schema.py
│   │   │   ├── supplier_schema.py			
│   │   │   ├── customer_schema.py			          
│   │   │   ├── purchase_order_schema.py	
│   │   │   ├── sales_order_schema.py                        
│   │   │   ├── order_item_schema.py       
│   │   │   ├── inventory_schema.py
│   │   │   ├── stock_movement_schema.py                      
│   │   │   └── __init__.py 
│   │   │    
│   │   ├── services/                              # Business logic
│   │   │   ├── auth_service.py
│   │   │   ├── product_service.py
│   │   │   ├── supplier_service.py
│   │   │   ├── customer_service.py
│   │   │   ├── purchase_order_service.py
│   │   │   ├── sale_order_service.py
│   │   │   ├── order_item_service.py
│   │   │   ├── inventory_service.py
│   │   │   ├── stock_movement_service.py
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