import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

const CountdownComponent = () => {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const updateCountdown = () => {
      // Get FitnessFusionConfig from localStorage
      const fitnessFusionConfig = JSON.parse(localStorage.getItem('FitnessFusionConfig'));

      if (fitnessFusionConfig && fitnessFusionConfig.milestoneName && fitnessFusionConfig.milestoneDate) {
        // Calculate the countdown
        const milestoneDate = new Date(fitnessFusionConfig.milestoneDate);
        const now = new Date();
        const timeDifference = milestoneDate - now;

        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Display the countdown in a string
        const countdownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        // Set the countdown state
        setCountdown(countdownString);
      }
    };

    // Update the countdown every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Call updateCountdown immediately to initialize the countdown
    updateCountdown();

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {countdown !== null ? (
        <div>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Good luck with your {localStorage.getItem('FitnessFusionConfig') && JSON.parse(localStorage.getItem('FitnessFusionConfig')).milestoneName}!
            </Typography>
          </CardBody>
          <CardFooter className="mx-auto">
            <Popover>
              <PopoverHandler>
                <Button className='w-full mt-auto'>{countdown}</Button>
              </PopoverHandler>
              <PopoverContent>
                It's time to train for your {localStorage.getItem('FitnessFusionConfig') && JSON.parse(localStorage.getItem('FitnessFusionConfig')).milestoneName}!
              </PopoverContent>
            </Popover>
          </CardFooter>
        </div>
      ) : (
        <p>No milestone data found</p>
      )}
    </div>
  );
};

export default CountdownComponent;