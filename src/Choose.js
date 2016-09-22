import React, { Component } from 'react';
import getRestaurants from './config/api';

class Choose extends Component {
  constructor() {
    super();
    this.state = {filteredRestaurants: []};
  }
  componentDidMount() {
    getRestaurants().then(filteredRestaurants => console.log(filteredRestaurants));
  }
  render () {
    let restaurants = this.state.filteredRestaurants.map((restaurant, index) => <li key={index}>{restaurant.name}</li>);
    return (
      <ul>
        {restaurants}
      </ul>
    )
  }
}

export default Choose;
