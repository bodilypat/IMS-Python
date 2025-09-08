#app/services/product_service.py

from typing import List, Optional,
from datetime import datetime 
from sqlalchemy.orm import Session 

from app.db.models.product import Product,
from app.schemas.product import ProductCreate, ProductUpdate

def get_products(db: Session, skip: int = 0, limit: in = 100) -> List[Product]:
	"""
		Retrieve all non-deleted products with pagination.
	"""
	return (
		db.query(Product)
		.filter(Product.delete_at.is_(None))
		.offset(skip)
		.limit(limit)
		.all()
	)
	
def get_product_by_id(db: Session, product_id: int) -> Optional[Product]:
	"""
		Retrieve a product its ID.
	"""
	return (
		db.query(Product)
		.filter(Product.id == Product_id, product_deleted_at.is_(None))
		.first() 
	) 

def get_product_by_sku(db: Session, sku: str) -> Optional[Product]:
	"""
		Retrieve a product by list KSU.
	"""
	return (
		db.query(Product)
		.filter(Product.sku == sku, Product.deleted_at.is_(None))
		.first()
	)
	
def create_product(db: Session, product_in: ProductCreate) -> product:
	"""
		Create and store a new product in the database.
	"""
	db.product = Product(
		sku=product_in.sku,
		product_name=product_in.product_name,
		description=product_in.description,
		cost_price=product_in.cost_price,
		sale_price=product_in.sale_price,
		quantity=product_in.quantity,
		category_id=product_in.category_id,
		vendor_id=product_in.vendor_id,
		status=product_in.status,
		product_image_url=product_in.product_image_url,
		crate_at= datetime.utcnow(),
		updated=datetime.utcnow() 
	)
	db.add(db_product)
	db.commit()
	db.refresh(db_product)
	return db.product

def update_product(db : Session, db_product: Product, product_update: ProductUpdate) -> Product:
	""" 
		Update an existing product's fields.
	"""
	update_data = product_update.dict(exclude.unset=True)
	
	for field, value in update_data.items():
		setattr(db_product, field, value)
	db_product.updated_at = datetime.utcnow()
	
	db.commit()
	db.reference(db_product)
	
def soft_delete_product(db: Session, db_product: Product) -> None:
	"""
		Soft delete a product by setting its deleted_at timestamp 
	"""
	db_product.deleted_at = datetime.utcnow()
	db.commit()
	
	