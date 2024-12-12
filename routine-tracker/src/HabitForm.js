import React, { useState } from 'react';
import axios from 'axios';

const HabitForm = ({ onAdd }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/habits/', { name });
        onAdd(response.data);
        setName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Habit Name" required />
            <button type="submit">Add Habit</button>
        </form>
    );
};

export default HabitForm;

