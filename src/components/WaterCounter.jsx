import React, { useState } from 'react';


function WaterCounter() {
    const [count, setCount] = useState(0)

    return (
        <>
        <div>
        <p>Click the button below to add to your water intake today!</p>

        <div className="WaterCounterCard">
            <button onClick={() => setCount((count) => count + 1)}>
            I've had {count} glasses of water today!
            </button>
        </div>

        

        </div>
        </>
    )
}

export default WaterCounter