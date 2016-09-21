import axios from 'axios';



const headers = {'Authorization': 'Token token=supadupasecret'};

function getRestaurants(categories = "restaurants") {
  let url = "https://fathomless-woodland-51903.herokuapp.com/search";
  let data = {
    "search": {
      "location": 32801,
      "categories": categories
    }
  };
  return axios({method: 'post', url, headers, data}).then(response => response.data.businesses);
}

export default getRestaurants;
