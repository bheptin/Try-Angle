import React, { Component } from 'react';
import base from './config/ReBase';

const categories = ["American", "Asian", "Indian", "Italian", "Mexican", "South American"];

class FoodPref extends Component {
  constructor() {
    super();
    this.state = {foodPrefs: []};
  }
  componentDidMount() {
    base.syncState(`${this.props.uid}/foodPrefs`, {
      context: this,
      state: 'foodPrefs'
    })
  }
  render () {
    let checkBoxes = categories.map((category, index) => (
      <label key={index}>
        <input type="checkbox" onChange={this.handleChange}/>
        {category}
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

export default FoodPref;
