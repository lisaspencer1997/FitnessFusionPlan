import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import API from "../utils/foodAPI"


function NutriCheck() {
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState('Search for an Ingredient');
    // const [dietLabels, setDietLabels] = useState([]);
    // const [nutrients, setNutrients] = useState([]);
    // const [calories, setCalories] = useState([]);

    const searchFood = (query) => {
        API.search(query)
        .then((res) => {
            setData(res?.data)
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
        <>
            <div className="relative flex flex-col mt-6 p-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                <div className='flex flex-row gap-2'>
                    <Input
                    onChange={handleInputChange}
                    variant="outlined" label="Type an ingredient" placeholder="150gr chicken" />
                    <button
                        onClick={handleFormSubmit}
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                        type="button">
                        Search
                    </button>
                </div>
                <div className="p-6">
                    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        {searchData}
                    </h5>
                    
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                        {data}
                    </p>
                </div>
            </div>
        </>
    );
}

export default NutriCheck;
// https://www.edamam.com/api/recipes/v2?type=public&q=&field=uri&field=label&field=image&field=calories&field=yield&field=source&field=ingredientLines&diet=low-carb&diet=low-fat&_=1709319239190