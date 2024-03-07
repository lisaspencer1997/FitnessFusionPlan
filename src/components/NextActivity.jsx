import React, { useState, useEffect } from 'react';
import {
    Checkbox,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
    CardBody
} from "@material-tailwind/react";

const NextActivity = () => {
    const [nextActivity, setNextActivity] = useState('');
    const [nextActivityDate, setNextActivityDate] = useState('');

    useEffect(() => {
        // Retrieve initialData from localStorage
        const storedData = JSON.parse(localStorage.getItem('ActivityPlannerData'));
        const initialData = storedData || {};

        // Check if initialData is a valid object
        if (typeof initialData === 'object' && initialData !== null) {
            const eventDates = Object.keys(initialData);

            // Check if there are any events
            if (eventDates.length > 0) {
                // Find the next non-empty event after today
                const sortedEventDates = eventDates
                    .filter(date => new Date(date) >= new Date())
                    .sort((a, b) => new Date(a) - new Date(b));

                const nextNonEmptyDate = sortedEventDates.find(date => initialData[date]?.activity1 || initialData[date]?.activity2);

                if (nextNonEmptyDate) {
                    setNextActivityDate(`${nextNonEmptyDate}`)
                    const nextActivity = initialData[nextNonEmptyDate]?.activity1 || initialData[nextNonEmptyDate]?.activity2 || '';

                    setNextActivity(`${nextActivity}`);
                } else {
                    setNextActivity('No upcoming activities');
                }
            } else {
                setNextActivity('No activities found');
            }
        } else {
            setNextActivity('Invalid initial data');
        }
    }, []);


    return (
        <div>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    Here is your upcoming activity:
                </Typography>
            </CardBody>
            <List>
                <ListItem className="p-0">
                    <label
                        htmlFor="vertical-list-react"
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                        <ListItemPrefix className="mr-3">
                            <Checkbox
                                id="vertical-list-react"
                                ripple={false}
                                className="hover:before:opacity-0"
                                containerProps={{
                                    className: "p-0",
                                }}
                            />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-medium">
                            {nextActivity} ({nextActivityDate})
                        </Typography>
                    </label>
                </ListItem>
            </List>
        </div>
    );
}

export default NextActivity;