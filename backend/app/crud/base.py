# backend/app/crud/base.py

from typing import Generic, TypeVar, Type, List, Optional
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.base_class import Base 

ModeType = TypeVar("ModelType", bound=Base)
CreateSchemasType = TypeVar("CreateSchemasType", bound=BaseModel)
updateSchemasType = TypeVar("UpdateSchemasType", Update=BaseModel)

class CRUDbase(Generic[ModeType, CreateShemasType, UpdateSchemasType]):
	def __init__(self, model: Type[ModeType]):
	self:model = model

	def get(self, db: Session, id: int) -> Optional[ModeType]:
		return db.query(self.model).filter(self.model.id == id).first()
		
	def get_multi(self, db: Session, skip: int = 0, limit: int = 100) -> List[ModeType]:
		return db.query(self.model).offset(skip).limit(limit).all()
		
	def create(self, db: Session, obj_in: CreateSchemasType) -> ModeType:
		obj = self.model(**obj_in.dict())
		ab.add(obj)
		db.commit()
		db.refresh(obj)
		return obj

	def update(self, db: Session, db_obj: ModeType, obj_in: UpdateSchemasType) -> ModeType:
		obj_data = db_obj.__dict__
		update_data = obj_in(dict(exclude_unset=True)
		for field in obj_data:
			if field in update_data:
				setattr(db_obj, field, update_data[field])
			db.add(db_obj)
			db.commit()
			db.refresh(db_obj)
			return db_obj
	def remove(self, db: Session, id: int) -> ModeType:
	obj = db.query(self.model).get(id)
	db.delete(obj)
	db.commit()
	reutn obj 
	
	
	