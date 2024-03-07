import {
    Checkbox,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
    CardBody
} from "@material-tailwind/react";

const DailyMealPlan = ({ mealPlan, currentDay }) => {
    const todayMeals = mealPlan[currentDay];

    if (!todayMeals) {
        return <div>No meals found for today.</div>;
    }

    return (
        <div>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    Here is your meal plan for today:
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
                            {todayMeals.breakfast}
                        </Typography>
                    </label>
                </ListItem>
                <ListItem className="p-0">
                    <label
                        htmlFor="vertical-list-vue"
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                        <ListItemPrefix className="mr-3">
                            <Checkbox
                                id="vertical-list-vue"
                                ripple={false}
                                className="hover:before:opacity-0"
                                containerProps={{
                                    className: "p-0",
                                }}
                            />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-medium">
                            {todayMeals.lunch}
                        </Typography>
                    </label>
                </ListItem>
                <ListItem className="p-0">
                    <label
                        htmlFor="vertical-list-svelte"
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                        <ListItemPrefix className="mr-3">
                            <Checkbox
                                id="vertical-list-svelte"
                                ripple={false}
                                className="hover:before:opacity-0"
                                containerProps={{
                                    className: "p-0",
                                }}
                            />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-medium">
                            {todayMeals.snacks}
                        </Typography>
                    </label>
                </ListItem>
                <ListItem className="p-0">
                    <label
                        htmlFor="vertical-list-svelte"
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                        <ListItemPrefix className="mr-3">
                            <Checkbox
                                id="vertical-list-svelte"
                                ripple={false}
                                className="hover:before:opacity-0"
                                containerProps={{
                                    className: "p-0",
                                }}
                            />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-medium">
                            {todayMeals.dinner}
                        </Typography>
                    </label>
                </ListItem>
            </List>
        </div>
    );
};

export default DailyMealPlan;