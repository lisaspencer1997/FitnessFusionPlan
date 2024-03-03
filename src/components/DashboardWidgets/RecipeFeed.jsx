import { useState } from 'react';
import axios from 'axios';


function RecipeFeed() {
    
    const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/1082038/nutritionWidget',
    params: {defaultCss: 'true'},
    headers: {
        'X-RapidAPI-Key': '04b103dfc5msha2234c28fa733afp16befdjsn9807fe93815a',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
};

try {
    //const response = await axios.request(options);
    console.log(response.data);
} catch (error) {
    console.error(error);
}


        
    };

export default RecipeFeed;
