import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [eventData, setEventData] = useState({
        eventName: '',
        eventDateTime: '',
    });

    const [countdown, setCountdown] = useState('');
    const [isEventDay, setIsEventDay] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const saveEventToLocalStorage = () => {
        localStorage.setItem('eventData', JSON.stringify(eventData));
    };


    const loadEventFromLocalStorage = () => {
        const storedEventData = localStorage.getItem('eventData');
        if (storedEventData) {
            setEventData(JSON.parse(storedEventData));
        }
    };

    const calculateCountdown = () => {
        const eventDate = new Date(eventData.eventDateTime);
        const currentDate = new Date();

        const timeDifference = eventDate - currentDate;
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        if (days > 0) {
            setCountdown(`${days} days`);
        } else if (hours > 0) {
            setCountdown(`${hours} hours`)
        } else if (minutes > 0) {
            setCountdown(`${minutes} minutes`)
        } else if (seconds > 0) {
            setCountdown(`${seconds} seconds`)
        } else {
            setIsEventDay(true);
            setCountdown('The day is finally here!');
        };
    };

    useEffect(() => {
        loadEventFromLocalStorage();
        calculateCountdown();
    }, []);

    useEffect(() => {
        saveEventToLocalStorage();
        calculateCountdown();

        const countdownInterval = setInterval(() => {
            calculateCountdown();
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [eventData]);

    return (
        <div>
            <p>Enter the details of the event:</p>
            <textarea
                name="eventName"
                placeholder="Event Name"
                value={eventData.eventName}
            />
            <textarea
                name="eventDateTime"
                placeholder="Date and Time"
                value={eventData.eventDateTime}
            />

            <div className="countdown-widget">
                <p>{eventData.eventName}</p>
                <p>{isEventDay ? 'Countdown:' : 'Days left:'}</p>
                <p>{countdown}</p>
            </div>
        </div>
    );
    
};

export default CountdownTimer;