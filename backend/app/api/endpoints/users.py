#app/api/endpoints/users.py

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.services import audit_service
from app.models.user import User
from app.schemas.user import UserResponse
from app.dependencies import get_current_active_user


router = APIRouter(prefix="/users", tags=["users"])

#------------------------------------------------
# List user (admin)
#------------------------------------------------
@router.get(
        "/", 
        response_model=List[UserResponse]
    )
def list_users(
        db: Session = Depends(get_db), 
        current_user: User = Depends(get_current_active_user),
        skip: int = Query(0, ge=0),
        limit: int = Query(10, ge=1, le=100)
    ):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    users = db.query(User).offset(skip).limit(limit).all()
    # Log audit event
    audit_service.log_audit_event(
        db=db,
        user_id=current_user.id,
        user_role=current_user.role,
        action="list_users",
        description=f"Listed users with skip={skip} and limit={limit}"
    )
    
    return users

#-------------------------------------------------
# Get user by ID 
#-------------------------------------------------
@router.get(
        "/{user_id}", 
        response_model=UserResponse
    )
def get_user(
        user_id: int,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_active_user)
    ):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Log audit event
    audit_service.log_audit_event(
        db=db,
        user_id=current_user.id,
        user_role=current_user.role,
        action="get_user",
        description=f"Retrieved user with ID={user_id}"
    )

    return user

#-------------------------------------------------
# Delete user by ID (admin only)
#-------------------------------------------------
@router.delete(
        "/{user_id}", 
        status_code=status.HTTP_204_NO_CONTENT
    )
def delete_user(
        user_id: int,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_active_user)
    ):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    db.delete(user)
    db.commit()
    # Log audit event
    audit_service.log_audit_event(
        db=db,
        user_id=current_user.id,
        user_role=current_user.role,
        action="delete_user",
        description=f"Deleted user with ID={user_id}"
    )
    return

#-------------------------------------------------
# Update user role (admin only)
#-------------------------------------------------
@router.put(
        "/{user_id}/role", 
        response_model=UserResponse
    )
def update_user_role(
        user_id: int,
        new_role: str = Query(..., regex="^(admin|user|viewer)$"),
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_active_user)
    ):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    user.role = new_role
    db.commit()
    db.refresh(user)

    # Log audit event
    audit_service.log_audit_event(
        db=db,
        user_id=current_user.id,
        user_role=current_user.role,
        action="update_user_role",
        description=f"Updated user ID={user_id} to role={new_role}"
    )
    return user

