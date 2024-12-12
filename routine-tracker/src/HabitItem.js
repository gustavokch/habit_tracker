import React, { useState } from 'react';
import axios from 'axios';

const HabitItem = ({ habit, onUpdate, onDelete }) => {
    const [days, setDays] = useState({
        monday: habit.monday,
        tuesday: habit.tuesday,
        wednesday: habit.wednesday,
        thursday: habit.thursday,
        friday: habit.friday,
        saturday: habit.saturday,
        sunday: habit.sunday,
    });

    const handleChange = async (e) => {
        const { name, checked } = e.target;
        setDays({ ...days, [name]: checked });

        const updatedDays = { ...days, [name]: checked };
        const progress = Object.values(updatedDays).filter(day => day).length / 7;
        const response = await axios.put(`http://localhost:8000/habits/${habit.id}`, { ...updatedDays, progress });
        onUpdate(response.data);
    };

    const handleDelete = async () => {
        await axios.delete(`http://localhost:8000/habits/${habit.id}`);
        onDelete(habit.id);
    };

    return (
        <div>
            <h3>{habit.name}</h3>
            <label>
                Monday
                <input type="checkbox" name="monday" checked={days.monday} onChange={handleChange} />
            </label>
            <label>
                Tuesday
                <input type="checkbox" name="tuesday" checked={days.tuesday} onChange={handleChange} />
            </label>
            <label>
                Wednesday
                <input type="checkbox" name="wednesday" checked={days.wednesday} onChange={handleChange} />
            </label>
            <label>
                Thursday
                <input type="checkbox" name="thursday" checked={days.thursday} onChange={handleChange} />
            </label>
            <label>
                Friday
                <input type="checkbox" name="friday" checked={days.friday} onChange={handleChange} />
            </label>
            <label>
                Saturday
                <input type="checkbox" name="saturday" checked={days.saturday} onChange={handleChange} />
            </label>
            <label>
                Sunday
                <input type="checkbox" name="sunday" checked={days.sunday} onChange={handleChange} />
            </label>
            <p>Progress: {(habit.progress * 100).toFixed(2)}%</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default HabitItem;
