import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button } from "@material-tailwind/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
} from "@material-tailwind/react";

const NutriFact = () => {

    const appID = "d4e8e88d";
    const appKey = "ec868f793463a230219db9df4a25757b"
    const [query, setQuery] = useState('');
    const [nutritionData, setNutritionData] = useState(null);
    const [error, setError] = useState(null);

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
        <div>
            <h2>Edamame API Demo</h2>
            <form onSubmit={handleFetchData}>
                <div className="relative flex w-full max-w-[24rem]">
                    <Input
                        type="text"
                        label="Search an ingredient"
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
                        Invite
                    </Button>
                </div>

            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {nutritionData && (
                <div>


                    <h3>Nutrition Data:</h3>
                    <p>Calories: {nutritionData.calories}</p>
                    <p>Total Weight: {nutritionData.totalWeight}</p>
                    <p>Diet Labels: {nutritionData.dietLabels.join(', ')}</p>
                    <p>Health Labels: {nutritionData.healthLabels.join(', ')}</p>

                    <h4>Total Nutrients:</h4>
                    <ul>
                        {Object.entries(nutritionData.totalNutrients).map(([nutrient, data]) => (
                            <li key={nutrient}>
                                {data.label}: {data.quantity} {data.unit}
                            </li>
                        ))}
                    </ul>

                    <h4>Total Daily Values:</h4>
                    <ul>
                        {Object.entries(nutritionData.totalDaily).map(([nutrient, data]) => (
                            <li key={nutrient}>
                                {data.label}: {data.quantity} {data.unit}
                            </li>
                        ))}
                    </ul>

                    <h4>Ingredients:</h4>
                    <ul>
                        {nutritionData.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.text}
                                <ul>
                                    {ingredient.parsed.map((parsedItem, idx) => (
                                        <li key={idx}>
                                            {parsedItem.quantity} {parsedItem.measure} of {parsedItem.food}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NutriFact;