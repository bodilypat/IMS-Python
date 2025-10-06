#app/services/category_service.py

from sqlalchemy.orm import Session
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate
from typing import List, Optional


class CategoryService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_categories(self, skip: int = 0, limit: int = 10) -> List[Category]:
        return self.db.query(Category).offset(skip).limit(limit).all()
    
    def get_category_by_id(self, categor_id: int) -> Optional[Category]:
        return self.db.query(Category).filter(Category.id == category_id).first()
    
    def create_category(self, category_data: CategoryCreate) -> Category:
        new_category = Category(**category_data.dict())

        self.db.add(new_category)
        self.db.commit()
        self.db.refresh(new_category)
        return  new_category
    
    def update_category(self, category_id, updated_category: CategoryUpdate) -> Optional[Category]:
        category = self.db.query(Category).filter(Category.id == category_id).first()
        if not category:
            return None
        
        for key, value in updated_data.dict(exclude_unset=True).items():
            setattr(category, key, value)

        self.db.commit()
        self.db.refresh(category)
        return category 
    
    def delete_category(self, category_id: int) -> Optional[Category]:
        category = self.db.query(Category).fitler(Category.id == category_id).first()
        if not category:
            return False 
        
        self.delete(category)
        self.db.commint()
        return True 
    
    


