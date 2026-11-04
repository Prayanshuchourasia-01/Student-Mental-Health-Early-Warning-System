from pwdlib import PasswordHash
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