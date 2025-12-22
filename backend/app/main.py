#app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.endpoints import auth, users, reports 
from app.db.session import Base, engine 

# Create all tables (if not already)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Inventory Management System API")

# ------------------------------------------------
# CORS Middleware
# ------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------
# Include API Routers
# ------------------------------------------------
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])

# ------------------------------------------------
# Root Endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Inventory Management System API"}

    user_role: str,

        