import React, { Component } from 'react';

const categories = ["American", "Asian", "Indian", "Italian", "Mexican", "South American"];

class FoodPref extends Component {
  render () {
    let checkBoxes = categories.map((category, index) => (
      <label key={index}>
        <input type="checkbox" onChange={this.props.handleChange}/>
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
