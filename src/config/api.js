import axios from 'axios';

const headers = {'Authorization': 'Token token=supadupasecret'};

function getRestaurants() {
  let url = "https://fathomless-woodland-51903.herokuapp.com/search";
  let data = {
    "search": {
      "location": 32801,
      "categories": "restaurants",
      "limit": 40
    }
  };
  return axios({method: 'post', url, headers, data}).then(response => response.data.businesses);
}

function getRestaurantById(id) {
  let url = `https://fathomless-woodland-51903.herokuapp.com/businesses/${id}`;
  return axios({method: 'get', url, headers}).then(response => response.data);
}

export { getRestaurants, getRestaurantById };
