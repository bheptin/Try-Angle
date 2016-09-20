import axios from 'axios';

function getRestaurants(categories) {
  categories = categories.join(",");
  let url = "https://api.yelp.com/v2/search/?location=32801&category_filter=${categories}";
  axios.get(url).then(response => console.log(response));
}

export default getRestaurants;
