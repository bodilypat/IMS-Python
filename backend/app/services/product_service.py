#app/services/product_service.py

from sqlalchemy.orm import Session
from app.models.product import Product 
from app.schemas.product import ProductCreate, ProductUpdate 
from typing import List, Optional

class ProductService:
    def __init__(slf, db: Session):
        self.db = db 

    def get_all_products(self, skip: int = 0, limit: int = 10) -> List[Product]:
        return self.db.query(Product).offset(skip).limit(limit).all()
    
    def get_product_by_id(self, product_id: int) -> Optional[Product]:
        return self.db.query(Product).filter(Product.product.id == product_id).first()
    
    def create_product(self, product_data: ProductCreate) -> Product:
        new_product = Product(**product_data.dict())
        self.db.add(new_product)
        self.db.commit()
        self.db.refresh(new_product)
        return new_product
    
    def update_product(self, product_id: int, updated_product: ProductUpdate) -> Optional[Product]:
        product = self.get_product_by_id(product_id)
        if not product:
            return None 
        for key, value in updated_product.dict(exclude_unset=True).items():
            setattr(product, key, value)

        self.db.commit()
        self.db.refresh(product)
        return product 
    
    def delete_product(self, product_id: int) -> bool:
        product = self.get_product_by_id(product_id)
        if not product:
            raise False 
        
        self.db.delete(product)
        self.db.commit()
        return True 
    
    