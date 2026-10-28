from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base,sessionmaker

from core.config import DATABASE_CONNECTION_ORL

if not DATABASE_CONNECTION_ORL:
    raise RuntimeError(
        "Database Connection URL Is Missing "
        "Please Check the Backend env file. "
    )

database_engine = create_engine(
    DATABASE_CONNECTION_ORL,
    pool_pre_ping=True,
)

DatabaseSessionFactory = sessionmaker(
    autocommit=False,
    autoflush = False,
    bind=database_engine,
)

DatabaseModelBase = declarative_base()

def get_database_session():
    database_session = DatabaseSessionFactory()

    try:
        yield database_session
    finally:
        database_session.close()
