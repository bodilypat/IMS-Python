#app/api/endpoints/auth.py

from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.sevices import auth_service
from app.db.session import get_db
from app.schemas.auth import (
    UserRegisterRequest,
    UserLoginResponse,
    UserLoginRequest,
    UserLoginResponse,
    ChangePasswordRequest,
    ResetPasswordRequest,
    GenerateResetTokenRequest,
    GenerateResetTokenResponse,
)
router = APIRouter(Prefix="/auth", tags=["Authentication"])

#------------------------------------------------
# Register 
#------------------------------------------------
@router.post(
    "/register", 
    response_model=UserRegisterResponse
)
def register_user(
    payload: UserRegisterRequest,
    db: Session = Depends(get_db)
):
    try:
        user = auth_service.full_registration_flow(
            db=db,
            payload=payload.username,
            password=payload.password,
            email=payload.email,
            user_role=payload.user_role,
        )
        return UserRegisterResponse.from_orm(user)
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve)
        )
    
#------------------------------------------------
# Login
#------------------------------------------------
@router.post(
    "/login", 
    response_model=UserLoginResponse
)
def login_user(
    payload: UserLoginRequest,
    db: Session = Depends(get_db)
):
    try:
        login_response = auth_service.authenticate_user(
            db=db,
            username=payload.username,
            password=payload.password
        )
        return login_response
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(ve)
        )
    
#------------------------------------------------
# Change Password
#------------------------------------------------
@router.post(
    "/change-password", 
    status_code=status.HTTP_204_NO_CONTENT
)
def change_password(
    payload: ChangePasswordRequest,
    db: Session = Depends(get_db)
):
    try:
        auth_service.change_user_password(
            db=db,
            username=payload.username,
            old_password=payload.old_password,
            new_password=payload.new_password
        )
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve)
        )
    
#------------------------------------------------
# Generate Reset Token
#------------------------------------------------
@router.post(
    "/generate-reset-token", 
    response_model=GenerateResetTokenResponse
)
def generate_reset_token(
    payload: GenerateResetTokenRequest,
    db: Session = Depends(get_db)
):
    try:
        reset_token = auth_service.generate_password_reset_token(
            db=db,
            email=payload.email
        )
        return GenerateResetTokenResponse(reset_token=reset_token)
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve)
        )
    
#------------------------------------------------
# Reset Password
#------------------------------------------------
@router.post(
    "/reset-password", 
    status_code=status.HTTP_204_NO_CONTENT
)
def reset_password(
    payload: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    try:
        auth_service.reset_user_password(
            db=db,
            reset_token=payload.reset_token,
            new_password=payload.new_password
        )
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve)
        )
    
