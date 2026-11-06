import os 
from dotenv import load_dotenv

load_dotenv()
# Database Connection
DATABASE_CONNECTION_URL = os.getenv("DATABASE_URL")

# JWT Auth Config
JWT_SECRET_KEY=os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES=int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES","30")
)