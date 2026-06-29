from sqlmodel import Field, SQLModel, create_engine, Session
from datetime import datetime
from typing import Optional

# 1. DATABASE SCHEMA: Define the blueprint rules for database storage columns
class TaskTable(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    text: str
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # AI/Automation Field: Keeps track of when you were last emailed a summary
    last_reminded_at: Optional[datetime] = Field(default=None)

# 2. LOCAL DATA HIGHWAY CONNECTION
# This instructs python to create a physical 'tasks.db' file on your hard drive
DATABASE_URL = "sqlite:///./tasks.db"
engine = create_engine(DATABASE_URL, echo=True)

# 3. HIGH-SPEED CONNECTORS: Helper function to open and close connections safely
def get_db_session():
    with Session(engine) as session:
        yield session

# 4. STARTUP HANDLER: Auto-draw tables on a cold boot server sequence
def init_db():
    SQLModel.metadata.create_all(engine)
