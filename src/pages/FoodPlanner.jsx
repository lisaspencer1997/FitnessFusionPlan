import React, { useState, useEffect } from 'react';
import { Card, Typography, Input, Chip, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

// Defining the header
const TABLE_HEAD = ["Day", "Breakfast", "Lunch", "Snacks", "Dinner"];

const ActivityPlanner = () => {

    // initialisation
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
            [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ]

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

    // Function to clear local storage and content
    const clearLocalStorageAndContent = () => {
        // Clear local storage
        localStorage.removeItem('foodPlannerData');

        // Clear content of the page
        setCalendarData(initialData);
        setCurrentWeek(getCurrentWeek());
    };

    return (
        <div className='flex flex-col gap-2 h-full'>            <Card className="overflow-x-scroll">
                <table className="text-left">

                    {/* TABLE HEADER */}
                    <thead>
                        <tr className='border-blue-gray-100 bg-blue-gray-50 h-10'>

                            {/* HEADER MAP */}
                            {TABLE_HEAD.map((head, i) => (
                                <th key={i}
                                    className="border-b px-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70 ps-4"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* TABLE BODY */}
                    <tbody>

                        {/* MAPPING AROUND THE WEEKDAYS */}
                        {currentWeek.map((date, index) => (
                            <tr key={index}>
                                <td className='p-2 text-center'><Chip className="w-40" value={date.toLocaleDateString('en-GB', { weekday: 'long' })} /></td>
                                <td className='px-4'>
                                    <Input
                                        variant="standard"
                                        label=""
                                        placeholder=""
                                        type="text"

                                        // Populating with information from the Local Storage, if any
                                        value={calendarData[date.toLocaleDateString('en-GB', { weekday: 'long', })]?.breakfast || ''}

                                        // On change, update the local storage
                                        onChange={(e) => handleInputChange(date.toLocaleDateString('en-GB', { weekday: 'long' }), 'breakfast', e.target.value)}
                                        className='hover:bg-blue-gray-100/80 px-4 hover:cursor-pointer'
                                    />
                                </td>
                                <td className='px-4'>
                                    <Input
                                        variant="standard"
                                        label=""
                                        placeholder=""
                                        type="text"
                                        value={calendarData[date.toLocaleDateString('en-GB', { weekday: 'long', })]?.lunch || ''}
                                        onChange={(e) => handleInputChange(date.toLocaleDateString('en-GB', { weekday: 'long' }), 'lunch', e.target.value)}
                                        className='hover:bg-blue-gray-100/80 px-4 hover:cursor-pointer'
                                    />
                                </td>
                                <td className='px-4'>
                                    <Input
                                        variant="standard"
                                        label=""
                                        placeholder=""
                                        type="text"
                                        value={calendarData[date.toLocaleDateString('en-GB', { weekday: 'long', })]?.snacks || ''}
                                        onChange={(e) => handleInputChange(date.toLocaleDateString('en-GB', { weekday: 'long' }), 'snacks', e.target.value)}
                                        className='hover:bg-blue-gray-100/80 px-4 hover:cursor-pointer'
                                    />
                                </td>
                                <td className='px-4'>
                                    <Input
                                        variant="standard"
                                        label=""
                                        placeholder=""
                                        type="text"
                                        value={calendarData[date.toLocaleDateString('en-GB', { weekday: 'long', })]?.dinner || ''}
                                        onChange={(e) => handleInputChange(date.toLocaleDateString('en-GB', { weekday: 'long' }), 'dinner', e.target.value)}
                                        className='hover:bg-blue-gray-100/80 px-4 hover:cursor-pointer'
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-2">
                    <Button
                        onClick={clearLocalStorageAndContent}
                        color='red'
                        fullWidth={true}
                        ripple={true}
                        size='lg'
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default ActivityPlanner;