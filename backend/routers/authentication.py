
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from db.database import get_database_session
from models.user import User

from schemas.user_schema import (
    UserRegistration,
    UserLogin,
    UserResponse,
    TokenResponse
)

from core.security import (
    hash_password,
    verify_password,
    create_access_token
)


authentication_router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


# STUDENT REGISTRATION
@authentication_router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def register_student(
    student_data: UserRegistration,
    database_session: Session = Depends(get_database_session)
):

    existing_student = (
        database_session.query(User)
        .filter(User.email == student_data.email)
        .first()
    )

    if existing_student:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email address already exists."
        )

    secured_password_hash = hash_password(student_data.password)

    new_student = User(
        name=student_data.name,
        email=student_data.email,
        password_hash=secured_password_hash
    )

    try:
        database_session.add(new_student)
        database_session.commit()
        database_session.refresh(new_student)

    except IntegrityError:
        database_session.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email address already exists."
        )

    return new_student


# STUDENT LOGIN
@authentication_router.post(
    "/login",
    response_model=TokenResponse
)
def login_student(
    login_data: UserLogin,
    database_session: Session = Depends(get_database_session)
):

    existing_student = (
        database_session.query(User)
        .filter(User.email == login_data.email)
        .first()
    )

    if (
        not existing_student
        or not verify_password(
            login_data.password,
            existing_student.password_hash
        )
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email address or password.",
            headers={"WWW-Authenticate": "Bearer"}
        )

    access_token = create_access_token(existing_student.id)

    return TokenResponse(
        access_token=access_token,
        token_type="bearer"
    )
