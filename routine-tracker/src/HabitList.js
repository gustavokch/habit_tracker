import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HabitItem from './HabitItem';

const HabitList = () => {
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const fetchHabits = async () => {
            const response = await axios.get('http://localhost:8000/habits/');
            setHabits(response.data);
        };
        fetchHabits();
    }, []);

    const handleAddHabit = (habit) => {
        setHabits([...habits, habit]);
    };

    const handleUpdateHabit = (updatedHabit) => {
        setHabits(habits.map(habit => habit.id === updatedHabit.id ? updatedHabit : habit));
    };

    const handleDeleteHabit = (id) => {
        setHabits(habits.filter(habit => habit.id !== id));
    };

    return (
        <div>
            <HabitForm onAdd={handleAddHabit} />
            {habits.map(habit => (
                <HabitItem key={habit.id} habit={habit} onUpdate={handleUpdateHabit} onDelete={handleDeleteHabit} />
            ))}
        </div>
    );
};

export default HabitList;
