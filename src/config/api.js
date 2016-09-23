import axios from 'axios';

const headers = {'Authorization': 'Token token=supadupasecret'};
const url = "https://fathomless-woodland-51903.herokuapp.com/search";

function getRestaurants(categories = "restaurants") {
  let data = {
    "search": {
      "location": 32801,
      "categories": categories
    }
  };
  return axios({method: 'post', url, headers, data}).then(response => response.data.businesses);
}

function getRestaurantsById(id) {
  let data = {
    "id": "artisans-table-orlando"
  };
  axios({method: 'post', url, headers, data}).then(response => console.log(response));
}

export { getRestaurants, getRestaurantsById };
