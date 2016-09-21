import React, { Component } from 'react';
import Allergy from './Allergy';
import base from './config/ReBase';
import _ from 'lodash';

const categories = ["American", "Asian", "Indian", "Italian", "Mexican", "South American"];

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
    this.postToFirebase('foodPrefs', selectedPrefs);
    this.postToFirebase('allergies', selectedAllergies);
  }
  postToFirebase(endpoint, data) {
    base.post(`users/${this.props.uid}/${endpoint}`, {data});
  }
  render () {
    let checkBoxes = categories.map((category, index) => (
      <label key={index}>
        <input type="checkbox" ref={category}/>
        {category}
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
