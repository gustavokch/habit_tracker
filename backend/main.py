from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from typing import List
import databases
import models
import schemas
import sqlalchemy

app = FastAPI()

@app.on_event("startup")
async def startup():
    await models.database.connect()

@app.on_event("shutdown")
async def shutdown():
    await models.database.disconnect()

@app.post("/habits/", response_model=schemas.Habit)
async def create_habit(habit: schemas.HabitCreate, db: databases.Database = Depends(models.get_database)):
    query = models.Habit.insert().values(name=habit.name)
    last_record_id = await db.execute(query)
    return {**habit.dict(), "id": last_record_id}

@app.get("/habits/", response_model=List[schemas.Habit])
async def read_habits(db: databases.Database = Depends(models.get_database)):
    query = models.Habit.select()
    return await db.fetch_all(query)

@app.put("/habits/{habit_id}", response_model=schemas.Habit)
async def update_habit(habit_id: int, habit: schemas.HabitUpdate, db: databases.Database = Depends(models.get_database)):
    query = (
        models.Habit.update()
        .where(models.Habit.c.id == habit_id)
        .values(**habit.dict(exclude_unset=True))
        .returning(*models.Habit.c)
    )
    habit_db = await db.fetch_one(query)
    return habit_db

@app.delete("/habits/{habit_id}")
async def delete_habit(habit_id: int, db: databases.Database = Depends(models.get_database)):
    query = models.Habit.delete().where(models.Habit.c.id == habit_id)
    await db.execute(query)
    return {"message": "Habit deleted"}