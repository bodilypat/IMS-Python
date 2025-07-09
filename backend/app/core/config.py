# backend/app/core/config.py

from pydantic import BaseSettings 

class Settings(BaseSettings):
	PROJECT_NAME: str = "Medical Inventory Management System"
	API_V1_PREFIX: str = "/api/v1"
	
	# security 
	SECRET_KEY: str ="supersecretkey"
	ALGORITHM: str = "HS256"
	ACCESS_TOKEN_EXPIRE_MINUTES: int = 30 
	
	#Database 
	SQLALCHEMY_DATABASE_URI: str = "sqlite:///./mins.db" 
	
	class Config:
		env_file = ".env"
		env_file_encoding = "utf-8"
		
	settings = Settings() 
	