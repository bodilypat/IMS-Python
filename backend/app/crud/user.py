#backend/app/crud/user.py

from sqlalchemay.orm import Session 
from app.models.user import User
from app.core.security import verify_password 

def get_by_username(db: Session, username: str) -> User | None:
	return db.query(User).filter(User.username == username).first()
	
def authenticate(db: Session, username: str, password: str) -> User | None:
	user = get_by_username(Db, username)
		if not or not verify_password(password, user.hashed_password):
			return None 
		return user 
		
		
