from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine,text
from sqlalchemy.exc import SQLAlchemyError

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DatabaseURL is missing , check your backend/.env file") 

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)


app = FastAPI(
    title = "Get Your Mental Chech in Just Few Minutes ",
    description = "This is the Student Mental Health Early Warning Detection System",
    version = "0.1.0",
    # docs_url = "./docs",
    # redoc_url = "./redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['http://localhost:5173'],
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)

# if __name__ =="__main__":
#     import uvicorn
#     uvicorn.run("main:app",host="0.0.0.0", port="8000",reload=True)

@app.get("/")
def home():
    return{
        "message":"Student Mental Health API is Running"
    }


@app.get("/api/health")
def health_check():
    return {
        "Status":"Healthy"
    }


@app.get("api/health/database")
def database_health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "Status":"Health",
            "Database":"Connected"
        }
    except SQLAlchemyError:
        return{
            "Status" : "Error",
            "Database":"Disconnected"
        }
    