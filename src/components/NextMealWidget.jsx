import React, { useEffect, useState } from 'react';
import DailyMealPlan from './DailyMealPlan';

const NextMealWidget = () => {

    // States for mealplan and current day
    const [mealPlanData, setMealPlanData] = useState({});
    const [currentDay, setCurrentDay] = useState('');

    useEffect(() => {
        // Read foodPlannerData from localStorage and store inside storedMealPlan
        const storedMealPlan = localStorage.getItem('foodPlannerData');
        if (storedMealPlan) {
            setMealPlanData(JSON.parse(storedMealPlan));
        }

        // Get the current day
        const currentDate = new Date();
        // Hardcode array of days
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        // Get current day using the index
        const dayOfWeek = daysOfWeek[currentDate.getDay()];
        setCurrentDay(dayOfWeek);
    }, []);

    return (
        <div>
            <DailyMealPlan mealPlan={mealPlanData} currentDay={currentDay} />
        </div>
    )
}

export default NextMealWidget;