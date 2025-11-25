Full-Stack-Medical-Inventory-Management-System-Directory-Structure/
├── backend/ (MVC Restful API router with Python)
│   ├── app/                              
│   │   ├── api/                                # Defines RESTful endpoints using FastAPI
│   │   │   ├── v1/
│   │   │   ├── endpoints/
│   │   │  	│	├── Product_controller.py
│   │   │  	│	├── supplier_controller.py
│   │   │  	│	├── inventory_controller.py
│   │   │  	│	├── stock_controller.py
│   │   │  	│	├── report_controller.py
│   │   │   │   └── auth_controller.py
│   │   │   └── router.py                       # Aggregates v1 endpoints                   
│   │   ├── core/                               # App configurations, environment and JWT security
│   │   │   ├── config.py                       # Application settings      
│   │   │   ├── security.py                     # JWT, password hoshing, password hashing
│   │   │   └── logging.py                      # Logging configuration
│   │   ├── models/                             # SQLAlchemy ORM models 
│   │   │   ├── user.py
│   │   │   ├── inventory.py
│   │   │   ├── stock.py
│   │   │   ├── supplier.py
│   │   │   ├── report.py
│   │   │   └── __init__.py
│   │   ├── schemas/                            # Pydantic schemas 
│   │   │   ├── token.py                        # Authentication
│   │   │   ├── user.py					        # User Account 
│   │   │   ├── inventory.py                    # Medical items    
│   │   │   ├── stock.py                        # Batch & Quantity Tracking 
│   │   │   ├── supplier.py 
│   │   │   ├── report.py 
│   │   │   └── __init__.py                    
│   │   ├── services/                           # Business logic
│   │   │   ├── auth_service.py
│   │   │   ├── report_service.py
│   │   │   └── alert_service.py    
│   │   ├── db/                                 # Daabase connection and model registration
│   │   │   ├── base.py
│   │   │   ├── base_class.py
│   │   │   └── session.py                      # SQLALchemy  session factory    
│   │   ├── crud/                               # CRUD operations
│   │   │   ├── __init__.py                     # Import 'inventory', 'stock', 'supplier'
│   │   │   ├── base.py                         # Reusable CRUD logic
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
├── frontend/( React, JavaScript, HTML, CSS)
│   │   
│   ├── App.jsx
│   │                           
│   ├── main.jsx                                     
│   │   
│   ├── src/                                       
│   │   ├── api/                                               # Handle all network requests to backend API.
│   │   │   ├── axiosClient.js
│   │   │   ├── productApi.js
│   │   │   ├── catetogoriesApi.js
│   │   │   ├── suppliersApi.js    
│   │   │   ├── inventoryApi.js
│   │   │   ├── purchaseOrderApi.js
│   │   │   ├── SaleOrderApi.js                                      
│   │   │   └── userApi.js
│   │   ├── components/                                        # Reusable components
│   │   │   ├── tables/
│   │   │  	│	├── GenericTable.jsx
│   │   │  	│	├── ProductTable.jsx
│   │   │  	│	├── SupplierTable.jsx
│   │   │  	│	├── PuurchaseOrderTable.jsx
│   │   │  	│	├── SaleOrderTable.jsx
│   │   │   │   └── InventoryTable.jsx                                     
│   │   │   ├── forms/
│   │   │  	│	├── ProductForm.jsx
│   │   │  	│	├── SupplierForm.jsx
│   │   │  	│	├── WarehouseForm.jsx
│   │   │  	│	├── PurchaseOrderForm.jsx
│   │   │  	│	├── SalesOrderForm.jsx
│   │   │  	│	├── LoginForm.jsx
│   │   │  	│	├── UserForm.jsx
│   │   │   │   └── partials/
│   │   │  	│	    ├── ContactInfo.jsx
│   │   │  	│	    ├── AddressFields.jsx
│   │   │   │       └── PriceFields.jsx
│   │   │   ├── common/                                        # Shared helpers/logic compoments
│   │   │  	│	├── Loader.jsx
│   │   │  	│	├── Breadcrumb.jsx
│   │   │   │   └── Pagination.jsx                                                           
│   │   │   └── ui/                                            # Pure UI elements
│   │   │  		├── Button.jsx
│   │   │  		├── Input.jsx
│   │   │  		├── Select.jsx
│   │   │  		├── DatePicker.jsx
│   │   │  		├── TextArea.jsx
│   │   │  		├── Modal.jsx
│   │   │  		├── Table.jsx
│   │   │       └── Badge.jsx
│   │   ├── hooks/                                             
│   │   │   ├── useAuth.js
│   │   │   ├── useFetch.js
│   │   │   └── useForm.js
│   │   ├── context/                                        
│   │   │   └── AuthContext.jsx
│   │   ├── state/ (optional if using Redux/Zustand)                                            
│   │   │   ├── productSlice.js
│   │   │   ├── purchaseSlice.js
│   │   │   └── InventorySlice.js
│   │   ├── utils/                                             # Helper functions
│   │   │   ├── formatter.js
│   │   │   ├── validators.js
│   │   │   └── constants.js
│   │   ├── pages/  
│   │   │   ├── dashboard/
│   │   │   │   └── Dashboard.jsx   
│   │   │   ├── product/
│   │   │  	│	├── ProductList.jsx                            
│   │   │  	│	├── ProductDetail.jsx                           
│   │   │  	│	├── ProductCreate.jsx 
│   │   │  	│	├── ProductEdit.jsx 
│   │   │   │   └── categories/                        
│   │   │  	│	    ├── CategoryList.jsx                       
│   │   │  	│	    ├── CategoryDetial.jsx                       
│   │   │   │       └── CategoryForm.jsx                     
│   │   │   ├── suppliers/
│   │   │  	│	├── SupplierList.jsx                           
│   │   │  	│	├── SupplierDetail.jsx                         
│   │   │   │   └── SupplierCreate.jsx                                                   
│   │   │   ├── purchases/
│   │   │  	│	├── PurchaseOrderList.jsx                      
│   │   │  	│	├── PurchaseOrderCreate.jsx                   
│   │   │  	│	├── PurchaseOrderDetail.jsx
│   │   │   │   └── Items/
│   │   │  	│	    ├── POItemView.jsx                              
│   │   │  	│	    ├── POItemManage.jsx                                                  
│   │   │   │       └── POItemReceive.jsx                                                                              
│   │   │   ├── sales/
│   │   │  	│	├── SalesOrderList.jsx                           
│   │   │  	│	├── SaleOrderDetail.jsx                         
│   │   │   │   └── SaleOrderCreate.jsx                                                                            
│   │   │   └── auth/ 
│   │   │  		├── Login.jsx                         
│   │   │       └── Register.jsx       
│   │   └── styles/                                     
│   │       ├── global.css                                                     
│   │       └── variables.css                                 
│   │                    
│   └── package.json                       
├── .env                                        
├── requirements.txt                            
├── docker-compose.json                         
└── README.md                                  