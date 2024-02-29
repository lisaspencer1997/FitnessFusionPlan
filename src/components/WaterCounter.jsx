import React, { useEffect, useState } from 'react';


function WaterCounter() {

    const initialCount = parseInt(localStorage.getItem('waterCount')) || 0;

    const [count, setCount] = useState(initialCount)

    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        localStorage.setItem('waterCount', newCount.toString());
    };

    const handleDecrement = () => {
        const newCount = Math.max(0, count - 1);
        setCount(newCount);
        localStorage.setItem('waterCount', newCount.toString());
    };

    const handleReset = () => {
        setCount(0);
        localStorage.setItem('waterCount', '0')
    };

    useEffect(() => {
        const now = new Date();

        const midnight = new Date(now)
        midnight.setHours(24,0,0,0)
        const timeUntilMidnight = midnight - now

        const timeoutId = setTimeout(() => {
            handleReset()
        }, timeUntilMidnight)

        return () => clearTimeout(timeoutId)
    }, [count])

    return (
        <div className="WaterCounter">
        
        <p className="WaterCounterDisplay">I've had {count} glasses of water today!</p>

        <div className="WaterButtons">
            <button onClick={handleDecrement}></button>
            <button onClick={handleIncrement}></button>
        </div>


        </div>
    )
}

export default WaterCounter