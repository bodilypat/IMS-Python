Full-Stack-IMS-Directory-Structure/
├── backend/
│   ├── app/                              
│   │   ├── api/                                # Defines RESTful endpoints using FastAPI
│   │   │   ├── v1/
│   │   │   │   ├── router.py
│   │   │   │   ├── endpoints/
│   │   │   │	│	├── auth.py
│   │   │   │	│	├── inventorys.py
│   │   │   │	│	├── suppliers.py
│   │   │   │   │   └── stock.py
│   │   │   │   └── v1.py                       # Router aggregator                   
│   │   ├── core/                               # App configs, environment and JWT security
│   │   │   ├── config.py                             
│   │   │   ├── security.py                     # JWT, password hoshing
│   │   │   └── logging.py  
│   │   ├── crud/
│   │   │   ├── inventory.py
│   │   │   ├── stock.py
│   │   │   └── supplier.py                     
│   │   ├── db/                                 # Daabase connection and model loading
│   │   │   ├── base.py
│   │   │   ├── base_class.py
│   │   │   └── session.py                      # SQLALchemy  session factory
│   │   ├── models/                             SQLAlchemy ORM models 
│   │   │   ├── user.py
│   │   │   ├── inventory.py
│   │   │   ├── supplier.py
│   │   │   └── stock.py
│   │   ├── schemas/                            # Pydenticmodels
│   │   │   ├── token.py
│   │   │   ├── user.py					          
│   │   │   ├── inventory.py                        
│   │   │   ├── stock.py                       
│   │   │   └── supplier.py                    
│   │   ├── services/                           # business logic
│   │   │   ├── auth_service.py
│   │   │   ├── report_service.py
│   │   │   └── alert_service.py   
│   │   ├── utils/                              # FastAPI app entry point
│   │   │   ├── email.py
│   │   │   └── file.py         
│   │   ├── main.py								# FastAPI app entry point
│   │   └── deps.py                             # Dependency  overrides                        
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
├── requirements.py                                 
├── docker-compose.json                             
└── README.md
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── pages/
│   │   ├── dashboard.html
│   │   ├── inventoryList.tsx
│   │   ├── AddInventory.tsx
│   │   ├── StockIn.tsx
│   │   ├── StockOut.tsx
│   │   ├── reports.tsx
│   │   └── Login.tsx
│   │
│   ├── components/                     # Reusable frontend components
│   │   ├── header.html
│   │   ├── sidebar.html
│   │   ├── footer.html
│   │   └── modal.html
│   │
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.css
│   │   │   ├── layout.css
│   │   │   ├── reset.css
│   │   │   └── modules/
│   │   │       ├── navbars.css
│   │   │       ├── table.css
│   │   │       └── form.css
│   │   ├── js/
│   │   │   ├── app.js                       # Entry point
│   │   │   ├── api.js                       # AJAX request to backend
│   │   │   ├── auth.js                      # Login/session Logic
│   │   │   ├── utils/                       # Helper function
│   │   │   │   ├── modal.js
│   │   │   │   ├── dropdown.js
│   │   │   │   └── sidebar.js
│   │   │   └── modules/
│   │   │       ├── customers.js
│   │   │       ├── orders.js
│   │   │       ├── items.js
│   │   │       ├── products.js
│   │   │       ├── categories.js
│   │   │       ├── purchases.js
│   │   │       ├── vendors.js
│   │   │       └── users.js
│   │   └── images/
│   │       ├── logo.png
│   │       └── icons/
│
├── data/
│   ├── customers.json
│   └── products.json
│
├── uploads/
├── package.json
│
