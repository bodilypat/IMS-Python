#app/schemas/auth.py

from pydantic import BaseModel, EmailStr, Field

#------------------------------------------------
# Register 
#------------------------------------------------
class UserRegisterRequest(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=8)
    email: EmailStr
    role: str = "Staff"

#------------------------------------------------
# Register Response
#------------------------------------------------
class UserRegisterResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str

#------------------------------------------------
# Login
#------------------------------------------------
class UserLoginRequest(BaseModel):
    username: str
    password: str

#------------------------------------------------
# Change Password
#------------------------------------------------
class ChangePasswordRequest(BaseModel):
    user_id: int
    old_password: str
    new_password: str = Field(min_length=8)

#------------------------------------------------
# Generate Reset Token
#------------------------------------------------
class GenerateResetTokenRequest(BaseModel):
    email: EmailStr

class GenerateResetTokenResponse(BaseModel):
    message: str
#------------------------------------------------
# Reset Password
#------------------------------------------------
class ResetPasswordRequest(BaseModel):
    reset_token: str
    new_password: str = Field(min_length=8)

    