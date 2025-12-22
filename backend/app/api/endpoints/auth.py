#app/api/api_v1/endpoints/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.user import UserCreate, UserLogin, Token
from app.services.auth_service import (
    register_user,
    authenticate_user,
    create_token_for_user,
    get_user_by_email,
)

router = APIRouter(prefix="/auth", tags=["Auth"])

# ----------------------------
# Register
# ----------------------------
@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_create: UserCreate, db: Session = Depends(get_db)):
    existing_user = get_user_by_email(db, user_create.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    user = register_user(db, user_create)
    return {"id": user.id, "email": user.email}


# ----------------------------
# Login
# ----------------------------
@router.post("/login", response_model=Token)
def login(user_login: UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user(db, user_login.email, user_login.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    access_token = create_token_for_user(user)
    return {
        "access_token": access_token,
        "token_type": "bearer",
    }
