Full-Stack-Medical-Inventory-Management-System-Directory-Structure/
├── backend/ (FastAPI • Python • SQLAlchemy • MVC-like structure)
│   ├── app/
│   │   ├── api/                                # Defines RESTful endpoints and versioned routers
│   │   │   ├── v1/
│   │   │   │   ├── endpoints/
│   │   │   │   │   ├── products.py
│   │   │   │   │   ├── suppliers.py
│   │   │   │   │   ├── inventory.py
│   │   │   │   │   ├── stocks.py
│   │   │   │   │   ├── reports.py
│   │   │   │   │   └── auth.py
│   │   │   │   └── __init__.py
│   │   │   └── router.py                       # Aggregates v1 routers
│   │   ├── core/                               # App configuration and security
│   │   │   ├── config.py                       # Application settings (pydantic BaseSettings)
│   │   │   ├── security.py                     # JWT helpers, password hashing/verification
│   │   │   └── logging.py                      # Logging configuration
│   │   ├── models/                             # SQLAlchemy ORM models
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── inventory.py
│   │   │   ├── stock.py
│   │   │   ├── supplier.py
│   │   │   └── report.py
│   │   ├── schemas/                            # Pydantic schemas (requests/responses)
│   │   │   ├── __init__.py
│   │   │   ├── token.py
│   │   │   ├── user.py
│   │   │   ├── inventory.py
│   │   │   ├── stock.py
│   │   │   ├── supplier.py
│   │   │   └── report.py
│   │   ├── services/                           # Business logic, pure functions/classes
│   │   │   ├── auth_service.py
│   │   │   ├── report_service.py
│   │   │   └── alert_service.py
│   │   ├── db/                                 # Database bootstrapping and session management
│   │   │   ├── base.py                         # Declarative base & model registration helper
│   │   │   ├── base_class.py
│   │   │   └── session.py                      # SQLAlchemy engine & session factory
│   │   ├── crud/                               # Reusable CRUD operations per model
│   │   │   ├── __init__.py
│   │   │   ├── base.py
│   │   │   ├── inventory.py
│   │   │   ├── stock.py
│   │   │   └── supplier.py
│   │   ├── utils/                              # Small utilities
│   │   │   ├── email.py
│   │   │   └── files.py
│   │   ├── deps.py                             # Dependency providers for FastAPI (DB, auth)
│   │   └── main.py                             # FastAPI app factory / entrypoint
│   ├── alembic/                                # DB migrations (alembic)
│   │   ├── versions/
│   │   ├── env.py
│   │   └── README.md
│   ├── tests/                                  # Pytest suite
│   │   ├── conftest.py
│   │   ├── test_inventory.py
│   │   ├── test_auth.py
│   │   ├── test_suppliers.py
│   │   ├── test_stocks.py
│   │   └── test_users.py
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── requirements.txt
│   └── README.md
│   │
├── frontend/ (React • JavaScript • HTML • CSS)
│   ├── package.json
│   ├── vite.config.js | webpack.config.js (optional)
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── README.md
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── fonts/
│   │   ├── api/                           # Low-level HTTP clients
│   │   │   ├── axiosClient.js
│   │   │   ├── productApi.js
│   │   │   ├── categoriesApi.js
│   │   │   ├── suppliersApi.js
│   │   │   ├── inventoryApi.js
│   │   │   ├── purchaseOrderApi.js
│   │   │   ├── saleOrderApi.js
│   │   │   └── userApi.js
│   │   ├── services/                      # Business logic & composition over raw API
│   │   │   ├── productService.js
│   │   │   ├── supplierService.js
│   │   │   ├── purchaseOrderService.js
│   │   │   ├── saleOrderService.js
│   │   │   └── authService.js
│   │   ├── components/                     # Reusable UI & composed components
│   │   │   ├── ui/                         # Primitive, visual-only components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Select.jsx
│   │   │   │   ├── DatePicker.jsx
│   │   │   │   ├── TextArea.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Table.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   └── ui.css
│   │   │   ├── layout/                     # App chrome (Header, Footer, Sidebar)
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── tables/                     # Table compositions / row renderers
│   │   │   │   ├── GenericTable.jsx
│   │   │   │   ├── ProductTable.jsx
│   │   │   │   ├── SupplierTable.jsx
│   │   │   │   ├── PurchaseOrderTable.jsx
│   │   │   │   ├── SaleOrderTable.jsx
│   │   │   │   └── InventoryTable.jsx
│   │   │   ├── forms/                      # Form compositions (use Formik/React Hook Form)
│   │   │   │   ├── ProductForm.jsx
│   │   │   │   ├── SupplierForm.jsx
│   │   │   │   ├── WarehouseForm.jsx
│   │   │   │   ├── PurchaseOrderForm.jsx
│   │   │   │   ├── SalesOrderForm.jsx
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── partials/
│   │   │   │       ├── ContactInfo.jsx
│   │   │   │       ├── AddressFields.jsx
│   │   │   │       ├── FormHeader.jsx
│   │   │   │       ├── FormFooter.jsx
│   │   │   │       └── PriceFields.jsx
│   │   │   └── common/
│   │   │       ├── Loader.jsx
│   │   │       ├── Breadcrumb.jsx
│   │   │       ├── Pagination.jsx
│   │   │       └── ErrorBoundary.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useFetch.js
│   │   │   └── useForm.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── store/                          # Optional: Redux / Zustand / recoil
│   │   │   ├── productSlice.js
│   │   │   ├── purchaseSlice.js
│   │   │   └── inventorySlice.js
│   │   ├── utils/
│   │   │   ├── formatter.js
│   │   │   ├── validators.js
│   │   │   └── constants.js
│   │   ├── pages/                          # Route-level pages (feature grouped)
│   │   │   ├── Dashboard/
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── Products/
│   │   │   │   ├── ProductList.jsx
│   │   │   │   ├── ProductDetail.jsx
│   │   │   │   └── ProductFormPage.jsx
│   │   │   ├── Categories/
│   │   │   │   ├── CategoryList.jsx
│   │   │   │   ├── CategoryDetail.jsx
│   │   │   │   └── CategoryForm.jsx
│   │   │   ├── Suppliers/
│   │   │   │   ├── SupplierList.jsx
│   │   │   │   ├── SupplierDetail.jsx
│   │   │   │   └── SupplierCreate.jsx
│   │   │   ├── Purchases/
│   │   │   │   ├── PurchaseOrderList.jsx
│   │   │   │   ├── PurchaseOrderCreate.jsx
│   │   │   │   └── PurchaseOrderDetail.jsx
│   │   │   ├── Sales/
│   │   │   │   ├── SalesOrderList.jsx
│   │   │   │   ├── SalesOrderDetail.jsx
│   │   │   │   └── SalesOrderCreate.jsx
│   │   │   └── Auth/
│   │   │       ├── Login.jsx
│   │   │       └── Register.jsx
│   │   └── styles/
│   │       ├── globals.css
│   │       └── variables.css
│   └── tests/
│       ├── components/
│       ├── pages/
│       └── setupTests.js                    
├── .env                                        
├── requirements.txt                            
├── docker-compose.json                         
└── README.md                                  