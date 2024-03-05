import React, { useState, useEffect } from 'react';

const FoodPlannerCalendar = () => {
    const initialData = {
        Monday: { breakfast: '', lunch: '', snacks: '', dinner: '' },
        Tuesday: { breakfast: '', lunch: '', snacks: '', dinner: '' },
        Wednesday: { breakfast: '', lunch: '', snacks: '', dinner: '' },
        Thursday: { breakfast: '', lunch: '', snacks: '', dinner: '' },
        Friday: { breakfast: '', lunch: '', snacks: '', dinner: '' },
        Saturday: { breakfast: '', lunch: '', snacks: '', dinner: '' },
        Sunday: { breakfast: '', lunch: '', snacks: '', dinner: '' },
    };

    const [calendarData, setCalendarData] = useState(() => loadFromLocalStorage() || initialData);
    const [currentWeek, setCurrentWeek] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('foodPlannerData'));
        setCalendarData(storedData || initialData);

        setCurrentWeek(getCurrentWeek());
    }, []);

    useEffect(() => {
        localStorage.setItem('foodPlannerData', JSON.stringify(calendarData));
    }, [calendarData]);

    const getCurrentWeek = () => {
        const currentDate = new Date();
        const currentDayOfWeek = currentDate.getDay();
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - currentDayOfWeek);

        const weekDates = [...Array(7)].map((_, index) => {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + index);
            return date;
        });

        return weekDates;
    }

    const handleInputChange = (day, mealType, value) => {
        setCalendarData((prevData) => ({
            ...prevData,
            [day]: {
                ...prevData[day],
                [mealType]: value,
            },
        }));
    };

    useEffect(() => {
        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        const daysOfWeek =
        ['Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday']

        const updatedData = {};
        for (let i = 0; i < 7; i++) {
            const day = daysOfWeek[(currentDay + i) % 7];
            updatedData[day] = calendarData[day] || { breakfast: '', lunch: '', snacks: '', dinner: '' }
        }

        setCalendarData(updatedData);
    }, []);
    
    function loadFromLocalStorage() {
        const storedData = JSON.parse(localStorage.getItem('foodPlannerData'));
        return storedData;
    }

    return (
        <div className="food-planner-calendar">
            <h2>Food Planner Calendar</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Snacks</th>
                        <th>Dinner</th>
                    </tr>
                </thead>
                <tbody>
                    {currentWeek.map((date, index) => (
                        <tr key={index}>
                            <td>{date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}</td>
                            <td>
                                <input
                                    type="text"
                                    value={calendarData[date.toLocaleDateString('en-GB', { weekday: 'long', })]?.breakfast || ''}
                                    onChange={(e) => handleInputChange(date.toLocaleDateString('en-GB', { weekday: 'long'}), 'breakfast', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={calendarData[date.toLocaleDateString('en-GB', { weekday: 'long', })]?.lunch || ''}
                                    onChange={(e) => handleInputChange(date.toLocaleDateString('en-GB', { weekday: 'long'}), 'lunch', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={calendarData[date.toLocaleDateString('en-GB', { weekday: 'long', })]?.snacks || ''}
                                    onChange={(e) => handleInputChange(date.toLocaleDateString('en-GB', { weekday: 'long'}), 'snacks', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={calendarData[date.toLocaleDateString('en-GB', { weekday: 'long', })]?.dinner || ''}
                                    onChange={(e) => handleInputChange(date.toLocaleDateString('en-GB', { weekday: 'long'}), 'dinner', e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FoodPlannerCalendar;