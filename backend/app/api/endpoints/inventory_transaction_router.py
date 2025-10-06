#app/services/inventory_transaction_router.py

from fastapi import APIRouter, Depends, HTTPException, status, Query, Response 
from sqlalchemy.orm import Session
from typing import List 

from app.schemas.inventory_transaction import(
        InventoryTransactionCreate,
        InventoryTransacctionUpdate,
        InventoryTransactionRead
    )

from app.services.inventory_transaction_service import InventoryTransactionService 
from app.db.session import get_db 

router = APIRouter(prefix="/inventory-transactions",  tags=["Inventory Transactions"])

@router.get("/", response_model=List[InventoryTransactionRead], summary="Get a list fo Inventory Transactions")
def list_transactions(
        skip: int = Query(0, ge=0, description=" Number of records to skip"),
        limit: int = Query(10, le=100, description="Maximum number of records to return"),
        db: Session = Depends(get_db)
    ):
    return InventoryTransactionServiceD(db).get_all_transactions(skip=skip,limit=limit)

@router.get("/{transaction_id}", response_model=InventoryTransactionRead, summary="Get a single Inventory Transaction")
def read_transaction(
        transaction_id: int,
        db: Session = Depends(get_db)
    ):
    transaction = InventoryTransactionService(db).get_transaction_by_id(transaction_id)

    if not transaction:
        raise HTTPException(status_code=404, detail="Inventory transaction not found")
    return transaction 

@router.post("/", response_model=InventoryTransactionRead, summary="Create a new Inventory Transaction")
def create_transaction(
        transaction_data: int,
        db: Session = Depends(get_db)
    ):
    return InventoryTransactionService(db).create_transaction(transaction_data)

@router.put("/{transaction_id}", response_model=InventoryTransactionRead, summary="Update an existing Inventory Transaction")
def update_transaction(
        transaction_id: int,
        updated_transaction: InventoryTransacctionUpdate,
        db: Session = Depends(get_db)
    ):
    transaction = InventoryTransactionService(db).update_transaction(transaction_id, updated_transaction)
    if not transaction:
        raise HTTPException(status_code=404, detail="Inventory Transaction not found")
    return transaction 

@router.delete("/{transaction_id}", response_model=InventoryTransactionRead, summary="Delete Inventory Transaction")
def delete_transaction(
        transaction_id: int,
        db: Session = Depends(get_db)
    ):
    success = InventoryTransactionService(db).delete_transaction(transaction_id)
    if not success:
        raise HTTPException(status_code=404, detail="Inventory Transaction not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)