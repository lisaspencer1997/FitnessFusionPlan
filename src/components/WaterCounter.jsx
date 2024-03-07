import React, { useEffect, useState } from 'react';
import {
    ButtonGroup,
    Button,
} from "@material-tailwind/react";

import {
    PlusCircleIcon,
    MinusCircleIcon,
} from "@heroicons/react/24/solid";

function WaterCounter() {

    const storedConfig = localStorage.getItem('FitnessFusionConfig');
    const waterTarget = storedConfig ? JSON.parse(storedConfig).waterTarget || 0 : 0;

    // get the counter from the localStorage
    const initialCount = parseInt(localStorage.getItem('waterCount')) || 0;

    const [count, setCount] = useState(initialCount)
    const [color, setColor] = useState('red')

    // increment counter
    const handleIncrement = () => {
        const newCount = count + 0.2;
        setCount(Math.round(newCount * 100) / 100);
        localStorage.setItem('waterCount', newCount.toString());
        if (count >= waterTarget) {
            setColor("green");
        }
    };

    // decrement counter
    const handleDecrement = () => {
        const newCount = Math.max(0, count - 0.2);
        setCount(Math.round(newCount * 100) / 100);
        localStorage.setItem('waterCount', newCount.toString());
        if (count < waterTarget) {
            setColor("blue");
        }
    };

    // reset counter at midnight
    const handleReset = () => {
        setCount(0);
        localStorage.setItem('waterCount', '0')
    };

    // check for the time and call reset function if midnight
    useEffect(() => {
        const now = new Date();

        const midnight = new Date(now)
        midnight.setHours(24, 0, 0, 0)
        const timeUntilMidnight = midnight - now

        const timeoutId = setTimeout(() => {
            handleReset()
        }, timeUntilMidnight)

        return () => clearTimeout(timeoutId)
    }, [count])

    return (
        <ButtonGroup fullWidth={true} className='mt-3' color={color}>
            <Button onClick={handleDecrement}><MinusCircleIcon /></Button>
            <Button disabled={true}>{count} L</Button>
            <Button onClick={handleIncrement}><PlusCircleIcon /></Button>
        </ButtonGroup>
    )
}

export default WaterCounter;