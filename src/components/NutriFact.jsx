import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button } from "@material-tailwind/react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
    Chip
} from "@material-tailwind/react";

const NutriFact = () => {

    const appID = "d4e8e88d";
    const appKey = "ec868f793463a230219db9df4a25757b"
    const [query, setQuery] = useState('');
    const [nutritionData, setNutritionData] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = React.useState(1);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    const handleFetchData = (e) => {
        e.preventDefault();

        const apiUrl = `https://api.edamam.com/api/nutrition-data?app_id=${appID}&app_key=${appKey}&nutrition-type=cooking&ingr=${query}`;

        axios.get(apiUrl)
            .then(response => {
                setNutritionData(response.data);
                setError(null);
            })
            .catch(error => {
                setNutritionData(null);
                setError('Error fetching data from Edamame API');
            });
    };

    return (
        <div className='w-full p-10'>
            <Typography variant="h4" color="blue-gray">
                NutriFacts
            </Typography>
            <form onSubmit={handleFetchData}>
                <div className="relative flex w-full mt-4">
                    <Input
                        type="text"
                        label="Search one or more ingredients"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pr-20"
                        containerProps={{
                            className: "w-full",
                        }}
                    />
                    <Button
                        size="sm"
                        type='submit'
                        className="!absolute right-1 top-1 rounded"
                    >
                        Search
                    </Button>
                </div>

            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {nutritionData && (
                <div>
                    <Card className="overflow-hidden shadow-lg">
                        <CardBody>
                            <Typography variant="h4" color="blue-gray">
                                Showing information about {query}
                            </Typography>
                            <Typography variant="lead" color="gray" className="mt-3 font-normal">
                                {nutritionData.calories} KCal { }
                            </Typography>
                        </CardBody>
                        <CardFooter className="flex flex-col gap-3">
                            <div className="flex gap-1">
                                {nutritionData.dietLabels.map((dL, i) => (
                                    <Chip key={i} value={dL} />
                                ))}
                            </div>
                            <div className="flex gap-1 flex-wrap">
                                {nutritionData.healthLabels.map((hL, i) => (
                                    <Chip color="blue" key={i} value={hL} />
                                ))}
                            </div>
                            <Card className='flex flex-row gap-2 px-2'>

                                <Accordion open={open === 1} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
                                    <AccordionHeader
                                        onClick={() => handleOpen(1)}
                                        className={`border-b-0 transition-colors ${open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
                                            }`}
                                    >Nutritional Value
                                    </AccordionHeader>
                                    <AccordionBody className="pt-0 text-base font-normal">
                                        {Object.entries(nutritionData.totalNutrients).map(([nutrient, data]) => (
                                            <p className="flex flex-row justify-between" key={nutrient}>
                                                {data.label}: <span className='font-bold'>{data.quantity.toFixed(2)} {data.unit}</span>
                                            </p>
                                        ))}
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === 1} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
                                    <AccordionHeader
                                        onClick={() => handleOpen(1)}
                                        className={`border-b-0 transition-colors ${open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
                                            }`}
                                    >Total Daily Values:
                                    </AccordionHeader>
                                    <AccordionBody className="pt-0 text-base font-normal">
                                        {Object.entries(nutritionData.totalDaily).map(([nutrient, data]) => (
                                            <p className="flex flex-row justify-between" key={nutrient}>
                                                {data.label}: <span className='font-bold'>{data.quantity.toFixed(2)} {data.unit}</span>
                                            </p>
                                        ))}
                                    </AccordionBody>
                                </Accordion>
                            </Card>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default NutriFact;