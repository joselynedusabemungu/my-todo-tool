from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from database import engine, TaskTable, init_db, get_db_session
from typing import List

# 1. INITIALIZE THE CORE APP SERVER FRAMEWORK
app = FastAPI(title="AI Workload Analytics Backend Engine")

# 2. CORS SECURITY CONFIGURATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# A simple root route to verify the server is active
@app.get("/")
def read_root():
    return {"status": "Database pipeline is active and working!"}

# 3. INTERCEPT SERVER STARTUP EVENT: Generates 'tasks.db' automatically
@app.on_event("startup")
def on_startup():
    init_db()

# 4. READ PIPELINE: GET all existing database records
@app.get("/api/tasks", response_model=List[TaskTable])
def read_all_tasks(session: Session = Depends(get_db_session)):
    statement = select(TaskTable)
    tasks = session.exec(statement).all()
    return tasks

# 5. WRITE PIPELINE: POST/Ingest a brand-new operational activity
@app.post("/api/tasks", response_model=TaskTable)
def create_new_task(task_data: TaskTable, session: Session = Depends(get_db_session)):
    task_data.id = None 
    session.add(task_data)
    session.commit()
    session.refresh(task_data)
    return task_data

# 6. MODIFICATION PIPELINE: PUT changes into a row
@app.put("/api/tasks/{task_id}", response_model=TaskTable)
def update_task_record(task_id: int, updated_data: TaskTable, session: Session = Depends(get_db_session)):
    db_task = session.get(TaskTable, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Target task data record not found in system storage index")
    
    db_task.text = updated_data.text
    db_task.completed = updated_data.completed
    
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

# 7. DELETION PIPELINE: DELETE a row permanently out of the database file
@app.delete("/api/tasks/{task_id}")
def delete_task_record(task_id: int, session: Session = Depends(get_db_session)):
    db_task = session.get(TaskTable, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Target record not found in index")
    
    session.delete(db_task) 
    session.commit() 
    return {"message": f"Successfully purged record index {task_id} from storage"}

