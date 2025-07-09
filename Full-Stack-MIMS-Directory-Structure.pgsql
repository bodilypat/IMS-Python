Full-Stack-Medical-Inventory-Management-System-Directory-Structure/
├── backend/
│   ├── app/                              
│   │   ├── api/                                # Defines RESTful endpoints using FastAPI
│   │   │   ├── v1/
│   │   │   │   ├── endpoints/
│   │   │   │	│	├── auth.py
│   │   │   │	│	├── inventory.py
│   │   │   │	│	├── suppliers.py
│   │   │   │	│	├── stocks.py
│   │   │   │   │   └── reports.py
│   │   │   │   ├── router.py
│   │   │   │   └── v1.py                       # Aggregates v1 endpoints                   
│   │   ├── core/                               # App configurations, environment and JWT security
│   │   │   ├── config.py                       # Application settings      
│   │   │   ├── security.py                     # JWT, password hoshing, password hashing
│   │   │   └── logging.py                      # Logging configuration
│   │   ├── models/                             # SQLAlchemy ORM models 
│   │   │   ├── user.py
│   │   │   ├── inventory.py
│   │   │   ├── stock.py
│   │   │   └── supplier.py
│   │   ├── schemas/                            # Pydantic schemas for request/response validation 
│   │   │   ├── token.py
│   │   │   ├── user.py					          
│   │   │   ├── inventory.py                        
│   │   │   ├── stock.py                       
│   │   │   └── supplier.py    
│   │   ├── services/                           # Business logic
│   │   │   ├── auth_service.py
│   │   │   ├── report_service.py
│   │   │   └── alert_service.py    
│   │   ├── db/                                 # Daabase connection and model registration
│   │   │   ├── base.py
│   │   │   ├── base_class.py
│   │   │   └── session.py                      # SQLALchemy  session factory    
│   │   ├── crud/                               # CRUD operations
│   │   │   ├── inventory.py
│   │   │   ├── stock.py
│   │   │   └── supplier.py                            
│   │   ├── utils/                              # FastAPI app entry point
│   │   │   ├── email.py
│   │   │   └── file.py         
│   │   ├── deps.py								# Dependency injection for FastAPI  
│   │   └── main.py                             # Dependency  overrides                        
│   ├── alembics/                               # DB migrations
│   │   ├── versions/  
│   │   └── env.py                   
│   ├── tests/   
│   │   ├── test_inventory.py
│   │   ├── test_auth.py
│   │   ├── test_suppliers.py
│   │   ├── test_stocks.py
│   │   ├── test_users.py
│   │   └── conftest.py                                 
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