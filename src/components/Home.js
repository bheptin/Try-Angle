import React, { Component } from 'react';
import Choose from './Choose';
import Friends from './Friends.js';
import Mood from './Mood';
import base from '../config/ReBase';

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
        this.setState({userPrefs});
      }
    })
    base.syncState(`users/${this.props.uid}/selectedFriends`, {
      context: this,
      asArray: true,
      state: 'selectedFriends'
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
        <h4>Home</h4>
        <Friends uid={this.props.uid} handleCheck={this.updateSelectedFriends}/>
        <Mood uid={this.props.uid} userPrefs={this.state.userPrefs} handleCheck={this.updateChosenRestaurants}/>
        <Choose selectedFriends={this.state.selectedFriends} userPrefs={this.state.userPrefs}/>
      </div>
    )
  }
}

export default Home;
