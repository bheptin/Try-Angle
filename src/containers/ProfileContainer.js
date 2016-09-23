import React, { Component } from 'react';
import { getRestaurants } from '../config/api';
import FoodPref from '../FoodPref';
import Profile from '../Profile';
import base from '../config/ReBase';

class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {restaurants: []};
    this.addPrefsAndAllergiesToDB = this.addPrefsAndAllergiesToDB.bind(this);
  }
  componentWillMount() {
    getRestaurants().then(restaurants => this.setState({restaurants}));
    console.log("ProfileContainer props are :", this.props);
  }
  addPrefsAndAllergiesToDB(prefs, allergies) {
    this.postToFirebase('foodPrefs', prefs);
    this.postToFirebase('allergies', allergies);
    this.context.router.push("home");
  }
  postToFirebase(endpoint, data) {
    base.post(`users/${this.props.uid}/${endpoint}`, {data});
  }
  render() {
      return (
        <div>
          <h1>Profile</h1>
          <Profile uid={this.props.uid}/>
          <FoodPref restaurants={this.state.restaurants} addToDB={this.addPrefsAndAllergiesToDB}/>
        </div>
      )
  }
}

ProfileContainer.contextTypes = {router: React.PropTypes.object.isRequired};

export default ProfileContainer;
