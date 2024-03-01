import axios from "axios";
const appID = "d4e8e88d";
const appKey= "ec868f793463a230219db9df4a25757b"

export default {
  search: function(query) {
    return axios.get(`https://api.edamam.com/api/nutrition-data?app_id=${appID}&app_key=${appKey}&nutrition-type=cooking&ingr=${query}`);
  }
};