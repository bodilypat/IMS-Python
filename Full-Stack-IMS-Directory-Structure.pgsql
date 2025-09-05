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
│   │   │   	│	├── sales_order_api.py
│   │   │   	│	├── stock_movement_api.py
│   │   │   	│	├── inventory.py
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
│   │   │   │   ├── user.py
│   │   │   │   ├── product.py
│   │   │   │   ├── supplier.py
│   │   │   │   ├── customer.py
│   │   │   │   ├── purchase_order.py
│   │   │   │   ├── sales_order.py
│   │   │   │   ├── order_item.py
│   │   │   │   ├── inventory.py
│   │   │   │   ├── stock_movement.py
│   │   │   │   └── __init__.py 
│   │   │   └── __init__.py        
│   │   │                     
│   │   ├── schemas/                               # Pydantic schemas for request/response validation 
│   │   │   ├── user.py
│   │   │   ├── product.py
│   │   │   ├── supplier.py			
│   │   │   ├── customer.py			          
│   │   │   ├── purchase_order.py	
│   │   │   ├── sale_order.py                        
│   │   │   ├── order_item.py       
│   │   │   ├── inventory.py
│   │   │   ├── stock_movement.py                      
│   │   │   └── __init__.py 
│   │   │    
│   │   ├── services/                              # Business logic
│   │   │   ├── auth_service.py
│   │   │   ├── product_service.py
│   │   │   ├── supplier_service.py
│   │   │   ├── customer_service.py
│   │   │   ├── purchase_order_service.py
│   │   │   ├── sale_order_service.py
│   │   │   ├── inventory_service.py
│   │   │   ├── stock_movement_service.py
│   │   │   └── __init__.py   
│   │   │  
│   │   ├── dependencies.py	   
│   │   ├── main.py	
│   │   ├── alembic/                               
│   │   │   ├── version/                          
│   │   │   ├── env.py         
│   │   │   └── script.py  	
│   │   ├── tests/                              
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