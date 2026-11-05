from datetime import datetime
from pydantic import BaseModel, ConfigDict ,Field

class UserRegistration(BaseModel):
    name:str=Field(
        min_length=2,
        max_length=100,
        description="Full Name of the Student"
    )
    email:str=Field(
        min_length=11,max_length=255,description="Student Email Address"
    )
    password:str=Field(
        min_length=8,
        max_length=128,
        description="Password Chosen By The Student"
    )

# wHEN sUTDENT LOGINS IN THE SYSTEM THAT SCHEUMA 

class UserLogin(BaseModel):
    email:str=Field(
        min_length=5,
        max_length=255
    )
    password:str=Field(
        min_length=8,
        max_length=255
    )


class usesrResponse(BaseModel):
    id:int
    name:str
    email:str
    created_at:datetime

    model_config = ConfigDict(from_attributes=True)

