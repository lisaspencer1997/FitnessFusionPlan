import React, { useState, useEffect } from 'react';

const FoodPlannerCalendar = () => {
    const initialData = {
        Monday: { breakfast: '', lunch: '', snacks: '', dinner: ''},
        Tuesday: { breakfast: '', lunch: '', snacks: '', dinner: ''},
        Wednesday: { breakfast: '', lunch: '', snacks: '', dinner: ''},
        Thursday: { breakfast: '', lunch: '', snacks: '', dinner: ''},
        Friday: { breakfast: '', lunch: '', snacks: '', dinner: ''},
        Saturday: { breakfast: '', lunch: '', snacks: '', dinner: ''},
        Sunday: { breakfast: '', lunch: '', snacks: '', dinner: ''},
    };

    const [calendarData, setCalendarData] = useState(() => loadFromLocalStorage() || initialData);

    useEffect(() => {
        localStorage.setItem('foodPlannerData', JSON.stringify(calendarData));
    }, [calendarData]);

    const handleInputChange = (day, mealType, value) => {
        setCalendarData((prevData) => ({
            ...prevData,
            [day]: {
                ...prevData[day],
                [mealType]: value,
            },
        }));
    };
    
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
                    {Object.keys(calendarData).map(day => (
                        <tr key={day}>
                            <td>{day}</td>
                            <td>
                                <input
                                    type="text"
                                    value={calendarData[day].breakfast}
                                    onChange={e => handleInputChange(day, 'breakfast', e.target.value)}
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    value={calendarData[day].lunch}
                                    onChange={e => handleInputChange(day, 'lunch', e.target.value)}
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    value={calendarData[day].snacks}
                                    onChange={e => handleInputChange(day, 'snacks', e.target.value)}
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    value={calendarData[day].dinner}
                                    onChange={e => handleInputChange(day, 'dinner', e.target.value)}
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