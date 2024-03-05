import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const getInitialEventData = () => {
        const storedEventData = localStorage.getItem('eventData');
        return storedEventData ? JSON.parse(storedEventData) : {
            eventName: '',
            eventDateTime: '',
            eventHour: 0,
            eventMinute:0,
        }
    };

    const [eventData, setEventData] = useState(getInitialEventData);
    const [countdown, setCountdown] = useState('');
    const [isEventDay, setIsEventDay] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (e.target.type === 'date') {
            setEventData((prevData) => ({
                ...prevData,
                eventDateTime: value,
            }));
        } else if (name === 'eventHour' || name === 'eventMinute') {
            setEventData((prevData) => ({
                ...prevData,
                [name]: parseInt(value, 10),
            }))
        } else {
            setEventData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const saveEventToLocalStorage = () => {
        localStorage.setItem('eventData', JSON.stringify(eventData));
    };


    const loadEventFromLocalStorage = () => {
        const storedEventData = localStorage.getItem('eventData');
        if (storedEventData) {
            setEventData(JSON.parse(storedEventData));
        } else {
            setEventData({
                eventName: '',
                eventDateTime: '',
                eventHour: 0,
                eventMinute: 0,
            })
        }
    };

    const calculateCountdown = () => {
        const eventDate = new Date(eventData.eventDateTime);
        const currentDate = new Date();

        eventDate.setHours(eventData.eventHour, eventData.eventMinute, 0, 0);

        const timeDifference = eventDate - currentDate;

        if (timeDifference > 0) {
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
        } else {
            setIsEventDay(true)
            setCountdown('The day is finally here!')
        }
    };

    useEffect(() => {
        calculateCountdown();
    }, [eventData]);

    useEffect(() => {
        saveEventToLocalStorage();

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
                onChange={handleInputChange}
            />

            <input
                type="date"
                name="eventDateTIme"
                placeholder="Date"
                value={eventData.eventDateTime}
                onChange={handleInputChange}
            />

            <label>Time:</label>
            <select
                name="eventHour"
                value={eventData.eventHour}
                onChange={handleInputChange}
            >
                {[...Array(24).keys()].map((hour) => (
                    <option key={hour} value={hour}>
                        {hour}
                    </option>
                ))};
            </select>
            :
            <select
                name="eventMinute"
                value={eventData.eventMinute}
                onChange={handleInputChange}
            >
                {[...Array(60).keys()].map((minute) => (
                    <option key={minute} value={minute}>
                        {minute < 10 ? `0${minute}` : minute}
                    </option>
                ))}
            </select>

            {/* <textarea
                name="eventDateTime"
                placeholder="Date and Time"
                value={eventData.eventDateTime}
                onChange={handleInputChange}
            /> */}

            <div className="countdown-widget">
                <p>{eventData.eventName}</p>
                <p>{isEventDay ? 'Countdown:' : 'Days left:'}</p>
                <p>{countdown}</p>
            </div>
        </div>
    );
    
};

export default CountdownTimer;