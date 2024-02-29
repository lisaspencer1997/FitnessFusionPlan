import React, { useState } from 'react';


function WaterCounter() {
    const [count, setCount] = useState(0)

    const handleIncrement = () => {
        setCount((prevCount) => prevCount + 1);
    };

    const handleReset = () => {
        setCount(0);
    };

    return (
        <>
        <div>
        <p>Click the button below to add to your water intake today!</p>

        <div className="WaterCounterCard">
            <button onClick={handleIncrement}>
            I've had {count} glasses of water today!
            </button>
        </div>

        <div className="WaterResetButton">
            <button onClick={handleReset}> Reset </button>
        </div>

        </div>
        </>
    )
}

export default WaterCounter