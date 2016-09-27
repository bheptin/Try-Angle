import React, { Component } from 'react';
import base from '../config/ReBase';
import _ from 'lodash';

class FoodPrefs extends Component {
  constructor() {
    super();
    this.state = { selectedRestaurants: [] };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    base.syncState(`users/${this.props.uid}/foodPrefs`, {
      context: this,
      state: 'selectedRestaurants',
      asArray: true
    })
  }
  handleChange() {
    let selectedRestaurants = _.keysIn(_.pickBy(this.refs, 'checked'));
    this.setState({selectedRestaurants});
  }
  render () {
    let checkBoxes = this.props.allRestaurants.map((restaurant, index) => (
      <label key={index}>
        <input type="checkbox"
          ref={restaurant.id}
          onChange={this.handleChange}
          checked={this.state.selectedRestaurants.includes(restaurant.id)}/>
        {restaurant.name}
      </label>
    ));
    return (
      <div>
        <h2>Food Preferences</h2>
        {checkBoxes}
      </div>
    )
  }
}

export default FoodPrefs;
