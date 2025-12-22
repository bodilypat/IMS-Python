#app/api/endpoints/products.py

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, get_current_user
from app.models import User 
from app.models.product import Product 
from app.schemas.product import ProductCreate, ProductOut, ProductUpdate
from app.services.product_service import ProductService (
    create_product,
    get_product_by_id,
    get_all_products,
    update_product,
    delete_product,
)
router = APIRouter(prefix="/products", tags=["products"])

#--------------------------------------
# Create Product
#--------------------------------------
@router.post("/", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
def create_new_product(
    product_in: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    product = create_product(
        db=db, 
        product_data=product_in.model_dump(),
        owner_id=current_user.id
    )
    return product

#--------------------------------------
# Get all Products
#--------------------------------------
@router.get("/", response_model=List[ProductOut])
def read_products(
    db: Session = Depends(get_db),
):
    products = get_all_products(db=db)
    return products

#--------------------------------------
# Get Product by ID
#--------------------------------------
@router.get("/{product_id}", response_model=ProductOut)
def read_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = get_product_by_id(db=db, product_id=product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

#--------------------------------------
# Update Product
#--------------------------------------
@router.put("/{product_id}", response_model=ProductOut)
def update_existing_product(
    product_id: int,
    product_in: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    product = get_product_by_id(db=db, product_id=product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if product.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this product")
    updated_product = update_product(
        db=db,
        product=product,
        update_data=product_in.model_dump(exclude_unset=True)
    )
    return updated_product

#--------------------------------------
# Delete Product
#--------------------------------------
@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    product = get_product_by_id(db=db, product_id=product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if product.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this product")
    delete_product(db=db, product=product)
    return None

