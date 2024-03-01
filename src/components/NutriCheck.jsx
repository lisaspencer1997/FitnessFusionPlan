import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import SearchForm from './SearchForm';
import FoodDetail from "./FoodDetail";
import API from "../utils/foodAPI"

function NutriCheck() {
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState('Search for an Ingredient');
    const [title, setTitle] = useState('No data')
    const [calories, setCalories] = useState('No data')

    const searchFood = async (query) => {
        await API.search(query)
            .then((res) => {
                setData(res?.data)
                setTitle(data.ingredients[0].text)
                setCalories(data.calories)
            })
            .catch((err) => console.log(err));
    };

    const handleInputChange = (event) => {
        setSearchData(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        searchFood(searchData);
    };

    return (
        <div className="relative flex flex-col mt-6 p-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <SearchForm
                handleInputChange={handleInputChange}
                handleFormSubmit={handleFormSubmit}
            />
            <FoodDetail
                title={title}
                calories={calories}
            />
        </div>
    );
}

export default NutriCheck;
// https://www.edamam.com/api/recipes/v2?type=public&q=&field=uri&field=label&field=image&field=calories&field=yield&field=source&field=ingredientLines&diet=low-carb&diet=low-fat&_=1709319239190