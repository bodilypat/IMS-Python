#app/services/inventory_transaction_service.py

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError 
from typing import List, Optional 

from app.schemas.inventory_transaction import InventoryTransactionCreate, InventoryTransactionUpdate 
from app.models.inventory_transaction import InventoryTransaction 

class InventoryTransactionService:
    def __init__(self, db: Session):
        self.db = db 

    def get_all_transactions(self, skip: int = 0, limit: int = 10) -> List[InventoryTransaction]:
        """
            Retrieve a pagianated list of inventory transaction.
        """
        return self.db.query(InventoryTransaction).offset(skip).limit(limit).all()
    
    def get_transaction_by_id(self, transaction_id: int) -> Optional[InventoryTransaction]:
        """
            Retrieve  a single Inventory Transaction by ID.
        """
        return self.db.query(InventoryTransaction).filter(InventoryTransaction.id == transaction_id).first()
    
    def create_transaction(self, transaction_data: InventoryTransactionCreate) -> Optional[InventoryTransaction]:
        """
            Create a new Inventory Transaction.
        """
        try:
            new_transaction = InventoryTransaction(**transaction_data.dict())
            self.db.add(new_transaction)
            self.db.commit()
            self.refresh(new_transaction)
            return new_transaction
        except SQLAlchemyError  as e:
            self.db.rollback()
            raise e
        
    def update_transaction(self, transaction_id: int, updated_transaction: InventoryTransactionUpdate) -> Optional[InventoryTransaction]
        """
            Update field of an Inventory Transaction.
        """
        transaction = self.get_transaction_by_id(transaction_id)
        if not transaction:
            return None 
        for field, value in updated_transaction.dict(exclude_unset=True).items()
            setattr(transaction, field, value)

        self.commit()
        self.db.refresh(transaction)
        return transaction 
    
    def delete_transaction(self, transaction_id:int) ->Optional[InventoryTransaction]:
        """
            Delete an Inventory Transaction by ID. Return True if deleted, False if not found.
        """
        transaction = self.get_transaction_by_id(transaction_id)
        if not transaction:
            return False 
        
        self.db.delete(transaction)
        self.db.commit()
        return True 
    
    
