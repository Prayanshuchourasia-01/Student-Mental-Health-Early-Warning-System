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
    pool_pre_ping=True,
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
    
# Login and Register API Endpoints 

@app.get("/api/login")
def login():
    return {
        "message":"Login API is Working"
    }


@app.get("/api/register")
def register():
    return {
        "message":"Register API is Working"
    }


# Assessment API Endpoints
@app.get("/api/assessment/{assessment_id}")
def get_assessment(assessment_id: int):
    if not assessment_id:
        return {
            "message":"Assessment ID is required"
        }
    if assessment_id == 101:
        return{
            "assessment_id":assessment_id,",
            "assessment_name":"Depression Assessment",
            "assessment_description":"This assessment is designed to evaluate the presence and severity of depressive symptoms in
            "questions": [
                {
                    "question_id": 1,
                    "question_text": "How often have you felt that your daily activities and studies were difficult to manage?"
                }
                ,
                {
                    "question_id": 2,
                    "question_text": "How often have you experienced difficulty concentrating during lectures or study sessions?"
                },
                {
                    "question_id": 3,
                    "question_text": "How often have you felt physically tired or lacking energy to complete daily tasks?"
                },
                {
                    "question_id": 4,
                    "question_text": "How often have you felt worried, overwhelmed, or under academic pressure?"
                },
                {
                    "question_id": 5,
                    "question_text": "How often have you felt unable to maintain balance between personal life and academic responsibilities?"
                }
            ]
        }
    if assessment_id == 201:
        return{
            "assessment_id":assessment_id,
            "assessment_name":"Anxiety Assessment",
            "assessment_description":"This assessment is designed to evaluate the presence and severity of anxiety symptoms in students.",
            "questions": [
                {
                    "question_id": 1,
                    "question_text": "Over the past two weeks, how often have you had little interest or pleasure in doing things?"
                },
                {
                    "question_id": 2,
                    "question_text": "How often have you felt down, depressed, or hopeless about your academic or personal life?"
                },
                {
                    "question_id": 3,
                    "question_text": "How often have you had trouble falling asleep, staying asleep, or sleeping too much?"
                },
                {
                    "question_id": 4,
                    "question_text": "How often have you felt tired, exhausted, or lacking energy throughout the day?"
                },
                {
                    "question_id": 5,
                    "question_text": "How often have you had trouble concentrating on schoolwork, reading, or daily tasks?"
                }
            ]
        }

    if assessment_id == 301:
        return{
            "assessment_id":assessment_id,
            "assessment_name":"Stress Assessment",
            "assessment_description":"This assessment is designed to evaluate the presence and severity of stress symptoms in students.",
            "questions": [
                {
                    "question_id": 1,
                    "question_text": "Over the past two weeks, how often have you felt nervous, anxious, or on edge?"
                },
                {
                    "question_id": 2,
                    "question_text": "How often have you felt unable to stop or control worrying about exams, grades, or personal matters?"
                },
                {
                    "question_id":3,
                    "question_text":"How often have you worried too much about different potential problems?"
                },
                {
                    "question_id": 4,
                    "question_text": "How often have you had trouble relaxing during your free time?"
                },
                {
                    "question_id": 5,
                    "question_text": "How often have you felt so restless that it was hard to sit still?"
                }
            ]
        }
        if assessment_id == 401:
            return{
                "assessment_id":assessment_id,
                "assessment_name":"Perceived Stress Assessment",
                "assessment_description":"This assessment is designed to evaluate the overall mental health status of students.",
                "questions": [
                    {
                        "question_id": 1,
                        "question_text": "In the past month, how often have you felt upset because of something that happened unexpectedly?"
                    },
                    {
                        "question_id": 2,
                        "question_text": "How often have you felt that you were unable to control the important things in your student life?"
                    },
                    {
                        "question_id": 3,
                        "question_text": "How often have you felt nervous and stressed about upcoming assignment deadlines or tests?"
                    },
                    {
                        "question_id": 4,
                        "question_text": "How often have you felt that difficulties were piling up so high that you could not overcome them?"
                    },
                    {
                        "question_id": 5,
                        "question_text": "How often have you felt unable to handle personal or academic responsibilities effectively?"
                    }
                ]
            }


    return {
        "message":f"Get Assessment API is Working for assessment_id: {assessment_id}"
    }



# DashBoard API Endpoints




# Hisotry API Endpoints
@app.get("/api/{user_id}/history")
def getOverAllHistory(user_id:int):
    if not user_id:
        return {
            "message":"User ID is required"
        }
    return {
        "message":f"Get History API is Working for user_id: {user_id}"
    }

@app.get("/api/{user_id}/history/{assessment_id}")
def assessmentHistory(user_id:int,assessment_id:int):
    if not user_id:
        return(
            "message":"user ID is required"
        )
    if not assessment_id:
        return(
            "message":"assessment ID is required"
        )
    return {
        "message":f"Get History API is Working for user_id: {user_id} and assessment_id: {assessment_id}"
    }


# Profile API Endpoints

@app.get("/api/{user_id}/profile")
def getProfile(user_id:int):
    if not user_id:
        return(
            "message":"user ID is required"
        )
    return(
        "message":f"Get Profile API is Working for user_id: {user_id}"
    )



# Result API Endpoints
 @app.get("/api/{user_id}/results")
 def getUserResults(user_id:int):
     if not user_id:
         return(
             "message":"user ID is required"
         )
     return(
         "message":f"Get Results API is Working for user_id: {user_id}"
     )

