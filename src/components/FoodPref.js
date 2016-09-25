import React, { Component } from 'react';
import Allergy from './Allergy';
import _ from 'lodash';

class FoodPref extends Component {
  constructor() {
    super();
    this.state = {
      selectedRestaurants: {},
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
        <input type="checkbox" ref={restaurant.id}/>
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