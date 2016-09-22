import React, { Component } from 'react';
import Allergy from './Allergy';
import base from './config/ReBase';
import getRestaurants from './config/api';
import _ from 'lodash';

class FoodPref extends Component {
  constructor() {
    super();
    this.state = {
      allergies: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.alterAllergies = this.alterAllergies.bind(this);
  }
  alterAllergies(allergies) {
    this.setState({allergies});
  }
  handleSubmit(event) {
    event.preventDefault();
    let selectedPrefs = _.keysIn(_.pickBy(this.refs, 'checked'));
    let selectedAllergies = this.state.allergies;
    this.props.addToDB(selectedPrefs, selectedAllergies);
  }
  render () {
    let checkBoxes = this.props.restaurants.map((restaurant, index) => (
      <label key={index}>
        <input type="checkbox" ref={restaurant}/>
        {restaurant.name}
      </label>
    ));
    return (
      <div>
        <h2>Food Preferences</h2>
        <form onSubmit={this.handleSubmit}>
          {checkBoxes}
          <Allergy handleCheck={this.alterAllergies}/>
          <button type="submit">Next</button>
        </form>
      </div>
    )
  }
}

export default FoodPref;
