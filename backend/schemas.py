from pydantic import BaseModel
from typing import Optional

class HabitBase(BaseModel):
    name: str
    monday: bool = False
    tuesday: bool = False
    wednesday: bool = False
    thursday: bool = False
    friday: bool = False
    saturday: bool = False
    sunday: bool = False
    progress: float = 0.0

class HabitCreate(HabitBase):
    pass

class HabitUpdate(HabitBase):
    pass

class Habit(HabitBase):
    id: int

    class Config:
        orm_mode = True