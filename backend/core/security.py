from datetime import datetime,timedelta,timezone
import jwt 

from pwdlib import PasswordHash


from core.config import (
    JWT_SECRET_KEY,JWT_ALGORITHM,ACCESS_TOKEN_EXPIRE_MINUTES
)

password_hasher = PasswordHash.recommended()


def hash_password(plain_text_password:str)-> str:
    hashed_password = password_hasher.hash(plain_text_password)
    return hashed_password


def verify_password(
    plain_text_password:str,
    stored_password_hash:str
)->bool:
    return password_hasher.verify(
        plain_text_password,stored_password_hash
    )


# JWT Token Generation code here , 
def create_access_token(user_id:int)->str:
    if not JWT_SECRET_KEY:
        raise RuntimeError("JWT Secret key is not configured")
    expiration_time=datetime.now(timezone.utc)+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token_payload= {
        "sub":str(user_id),
        "exp":expiration_time
    }
    access_token=jwt.encode(
        token_payload,JWT_SECRET_KEY,algorithm=JWT_ALGORITHM
    )
    return access_token

# JWT Token Verify/Verification

def verify_access_token(access_token:str)->dict:
    if not JWT_SECRET_KEY:
        raise RuntimeError("JWT Secret Key not Configured")
    token_payload = jwt.decode(
        access_token,JWT_SECRET_KEY,algorithms=[JWT_ALGORITHM]
    )
    return token_payload

