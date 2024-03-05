import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [eventData, setEventData] = useState({
        eventName: '',
        eventDateTime: '',
    });

    const [countdown, setCountdown] = useState('');
    const [isEventDay, setIsEventDay] = useState(false);

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
        </div>
    )
    
};

export default CountdownTimer;