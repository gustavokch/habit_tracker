import databases
import sqlalchemy
from .models import DATABASE_URL, Base

# Create database instance
database = databases.Database(DATABASE_URL)

# Create metadata instance
metadata = sqlalchemy.MetaData()

# Create engine
engine = sqlalchemy.create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# Create tables
metadata.create_all(engine)

# Dependency to get the database session
async def get_database():
    await database.connect()
    try:
        yield database
    finally:
        await database.disconnect()