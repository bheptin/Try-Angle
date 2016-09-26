import React, { Component } from 'react';
import Choose from './Choose.js';
import Friends from './Friends.js';
import base from '../config/ReBase';
import { getRestaurantById } from '../config/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      userPrefs: [],
      selectedFriends: [],
      chosenRestaurants: []
    };
    this.updateSelectedFriends = this.updateSelectedFriends.bind(this);
    this.updateChosenRestaurants = this.updateChosenRestaurants.bind(this);
  }
  componentDidMount(){
    base.fetch(`users/${this.props.uid}/foodPrefs`, {
      context: this,
      asArray: true,
      then(userPrefs) {
        console.log(userPrefs);
        userPrefs.forEach(userPref => {
          getRestaurantById(userPref).then(restaurant => {
            console.log(restaurant);
            this.setState({userPrefs: [...this.state.userPrefs, restaurant]});
          });
        });
      }
    })

    base.syncState(`users/${this.props.uid}/selectedFriends`, {
      context: this,
      state: 'selectedFriends',
      asArray: true
    })
    base.syncState(`users/${this.props.uid}/chosenRestaurants`, {
      context: this,
      state: 'chosenRestaurants',
      asArray: true
    });
  }
  updateSelectedFriends(selectedFriends) {
    this.setState({selectedFriends});
  }
  updateChosenRestaurants(chosenRestaurants) {
    this.setState({chosenRestaurants});
  }

  render () {

    return (
      <div>

        <Friends uid={this.props.uid} handleCheck={this.updateSelectedFriends}/>
        <Choose
          selectedFriends={this.state.selectedFriends}
          userPrefs={this.state.userPrefs}
          uid={this.props.uid}
          handleCheck={this.updateChosenRestaurants}/>
      </div>
    )
  }
}

export default Home;
