import React, { Component } from 'react';
import getRestaurants from '../config/api';
import FoodPref from '../FoodPref';
import base from '../config/ReBase';

class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {restaurants: []};
    this.addPrefsAndAllergiesToDB = this.addPrefsAndAllergiesToDB.bind(this);
  }
  componentWillMount() {
    getRestaurants().then(restaurants => this.setState({restaurants}));
  }
  addPrefsAndAllergiesToDB(prefs, allergies) {
    this.postToFirebase('foodPrefs', prefs);
    this.postToFirebase('allergies', allergies);
  }
  postToFirebase(endpoint, data) {
    base.post(`users/${this.props.uid}/${endpoint}`, {data});
  }
  render() {
      return (
        <div>
          <h1>Profile</h1>
          <FoodPref restaurants={this.state.restaurants} addToDB={this.addPrefsAndAllergiesToDB}/>
        </div>
      )
  }
}

export default ProfileContainer;
