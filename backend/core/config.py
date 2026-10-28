import os 
from dotenv import load_dotenv

load_dotenv()
DATABASE_CONNECTION_ORL = os.getenv("DATABASE_URL")