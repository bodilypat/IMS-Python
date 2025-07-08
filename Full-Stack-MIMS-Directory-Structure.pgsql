Full-Stack-Medical-Inventory-Management-System-Directory-Structure/
├── backend/
│   ├── app/                              
│   │   ├── api/                                # Defines RESTful endpoints using FastAPI
│   │   │   ├── v1/
│   │   │   │   ├── endpoints/
│   │   │   │	│	├── auth.py
│   │   │   │	│	├── inventory.py
│   │   │   │	│	├── suppliers.py
│   │   │   │   │   └── stock.py
│   │   │   │   ├── router.py
│   │   │   │   └── v1.py                       # Aggregates v1 endpoints                   
│   │   ├── core/                               # App configurations, environment and JWT security
│   │   │   ├── config.py                       # Application settings      
│   │   │   ├── security.py                     # JWT, password hoshing, password hashing
│   │   │   └── logging.py                      # Logging configuration
│   │   ├── crud/                               # CRUD operations
│   │   │   ├── inventory.py
│   │   │   ├── stock.py
│   │   │   └── supplier.py                      
│   │   ├── db/                                 # Daabase connection and model registration
│   │   │   ├── base.py
│   │   │   ├── base_class.py
│   │   │   └── session.py                      # SQLALchemy  session factory 
│   │   ├── deps.py								# Dependency injection for FastAPI
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
│   │   ├── utils/                              # FastAPI app entry point
│   │   │   ├── email.py
│   │   │   └── file.py         
│   │   └── main.py                             # Dependency  overrides                        
│   ├── alembics/                               # DB migrations
│   │   ├── versions/  
│   │   └── env.py                   
│   ├── tests/  
│   │   ├── test_inventory.py
│   │   ├── test_auth.py
│   │   │   ├── test_auth.py
│   │   │   ├── test_patients.py
│   │   │   ├── test_doctors.py
│   │   │   └── test_appointments.py    
│   │   └── conftest.py  
│   │       ├── test_doctors.py
│   │       └── test_appointments.py                             
├── .env                                        # Environment variables
├── requirements.txt                            # Python dependencies
├── docker-compose.json                         # Docker Compose Configuration    
└── README.md                                   # Project overiew and setup instructions
│
├── frontend/
│   ├── assets/
│   │   ├── img/
│   │   │   └── logo.png
│   │   ├── icons/
│   │   │   └── inventory.svg
│   ├── css/                     
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── page.css
│   ├── js/
│   │   ├── api/                          
│   │   │   ├── auth.js                      
│   │   │   ├── inventory.js                      
│   │   │   ├── suppliers.js                      
│   │   │   └── stock.js
│   │   ├── components/                          
│   │   │   ├── navbar.js                      
│   │   │   ├── table.js                                     
│   │   │   └── model.js
│   │   ├── pages/                          
│   │   │   ├── dashboard.js                      
│   │   │   ├── login.js                      
│   │   │   ├── inventory.js  
│   │   │   ├── suppliers.js                           
│   │   │   └── stock.js
│   │   ├── utils/                          
│   │   │   ├── formValidator.js                      
│   │   │   ├── tokenManager.js                                 
│   │   │   └── domUtils.js
│   │   │
│   │   └── main.js
│   │
│   ├── html/
│   │   ├── index.html
│   │   ├── dashboard.html
│   │   ├── inventory.html
│   │   ├── suppliers.htm
│   │   └── stock.html
│   │
│   ├── .env
│   ├── .README.md
│   └── package.json

