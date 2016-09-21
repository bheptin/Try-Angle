import React, { Component } from 'react';
import base from './config/ReBase';

const categories = ["American", "Asian", "Indian", "Italian", "Mexican", "South American"];

class FoodPref extends Component {
  constructor() {
    super();
    this.state = {foodPrefs: []};
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    base.syncState(`users/${this.props.uid}/foodPrefs`, {
      context: this,
      state: 'foodPrefs',
      asArray: true
    })
  }
  handleChange(event) {
    let selectedFood = event.target.value;
    if ( !(this.state.foodPrefs.includes(selectedFood)) ) {
      this.setState({foodPrefs: [...this.state.foodPrefs, selectedFood]});
    }
  }
  render () {
    let checkBoxes = categories.map((category, index) => (
      <label key={index}>
        <input type="checkbox" onChange={this.handleChange} value={category}/>
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
