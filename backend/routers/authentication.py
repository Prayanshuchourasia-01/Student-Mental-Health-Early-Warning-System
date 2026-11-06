from fastapi import APIRouter,Depends,HTTPException,status # type: ignore
from sqlalchemy.orm import Session # type: ignore
from sqlalchemy.exc import IntegrityError # type: ignore

from db.database import get_database_session
from models.user import User

from schemas import UserRegistration,usesrResponse
from core.security import hash_password

authentication_router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]   
)

@authentication_router.post(
    "/register",
    response_model=usesrResponse,
    status_code = status.HTTP_201_CREATED
)
def register_student(
    student_data:UserRegistration,
    database_session:Session=Depends(get_database_session)
):
    existing_student=(
        database_session.query(User).filter(User.email==student_data.email).first()
    )
    if existing_student:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An Account with this email address already exists."
        )
    secured_password_hash = hash_password(student_data.password)
    new_student = User(name=student_data.name,email=student_data.email,password_hash=secured_password_hash)
    try:
        database_session.add(new_student)
        database_session.commit()
        database_session.refresh(new_student)

    except IntegrityError:
        database_session.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An Account with this email address already exists."
        )
    return new_student