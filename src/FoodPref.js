import React, { Component } from 'react';

const categories = ["American", "Asian", "Indian", "Italian", "Mexican", "South American"];

class FoodPref extends Component {
  render () {
    let checkBoxes = categories.map(category => (
      <label><input type="checkbox"/>{category}</label>
    ))
    return (
      <div>
        <h2>Food Preferences</h2>
        <form>
          {checkBoxes}
        </form>
      </div>
    )
  }
}

export default FoodPref;
