import React, { useState, useEffect } from 'react';
import { Card, Typography, Input, Chip, Button } from "@material-tailwind/react";
import Header from '../components/Header';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Defining the header
const TABLE_HEAD = ["Day", "Activity1", "Activity2"];

const ActivityPlanner = () => {
    // initialisation
    const initialData = {};

    // Function to get the number of days in a month
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    const [calendarData, setCalendarData] = useState(() => loadFromLocalStorage() || initialData);
    const [currentMonth, setCurrentMonth] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('ActivityPlannerData'));
        setCalendarData(storedData || initialData);

        setCurrentMonth(getCurrentMonth());
    }, []);

    useEffect(() => {
        localStorage.setItem('ActivityPlannerData', JSON.stringify(calendarData));
    }, [calendarData]);

    const getCurrentMonth = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);

        const monthDates = [...Array(daysInMonth)].map((_, index) => {
            const date = new Date(currentYear, currentMonth, index + 1);
            return date;
        });

        return monthDates;
    }

    const handleInputChange = (day, activityType, value) => {
        setCalendarData((prevData) => ({
            ...prevData,
            [day.toLocaleDateString('en-GB')]: {
                ...prevData[day.toLocaleDateString('en-GB')],
                [activityType]: value,
            },
        }));
    };

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);

        const updatedData = {};
        for (let i = 1; i <= daysInMonth; i++) {
            const day = new Date(currentYear, currentMonth, i).toLocaleDateString('en-GB');
            updatedData[day] = calendarData[day] || { activity1: '', activity2: '' }
        }

        setCalendarData(updatedData);
    }, []);

    function loadFromLocalStorage() {
        const storedData = JSON.parse(localStorage.getItem('ActivityPlannerData'));
        return storedData;
    }

    // Function to clear local storage and content
    const clearLocalStorageAndContent = () => {
        // Clear local storage
        localStorage.removeItem('ActivityPlannerData');

        // Clear content of the page
        setCalendarData(initialData);
        setCurrentMonth(getCurrentMonth());
    };

    return (
        <div className='flex flex-col gap-2 h-svh overflow-auto'>
            <Header heading='Weekly Activity Planner' />
            <Card className="h-svh overflow-y-scroll">
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

                        {/* MAPPING AROUND THE MONTH DATES */}
                        {currentMonth.map((date, index) => (
                            <tr key={index}>
                                <td className='p-2 text-center'><Chip className="w-40" value={date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long' })} /></td>
                                <td className='px-4'>
                                    <Input
                                        variant="standard"
                                        label=""
                                        placeholder=""
                                        type="text"

                                        // Populating with information from the Local Storage, if any
                                        value={calendarData[date.toLocaleDateString('en-GB')]?.activity1 || ''}

                                        // On change, update the local storage
                                        onChange={(e) => handleInputChange(date, 'activity1', e.target.value)}
                                        className='hover:bg-blue-gray-100/80 px-4 hover:cursor-pointer'
                                    />
                                </td>
                                <td className='px-4'>
                                    <Input
                                        variant="standard"
                                        label=""
                                        placeholder=""
                                        type="text"
                                        value={calendarData[date.toLocaleDateString('en-GB')]?.activity2 || ''}
                                        onChange={(e) => handleInputChange(date, 'activity2', e.target.value)}
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