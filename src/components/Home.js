import React, { Component } from 'react';
import ChooseContainer from '../containers/ChooseContainer.js';
import Friends from './Friends.js';
import base from '../config/ReBase';
import { getRestaurantById } from '../config/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      allRestaurants: {},
      userPrefs: [],
      selectedFriends: [],
      chosenRestaurants: []
    };
    this.updateSelectedFriends = this.updateSelectedFriends.bind(this);
    this.updateChosenRestaurants = this.updateChosenRestaurants.bind(this);
    this.updateAllRestaurants = this.updateAllRestaurants.bind(this);
  }
  componentDidMount(){
    this.ref = [];
    base.fetch(`users/${this.props.uid}/foodPrefs`, {
      context: this,
      asArray: true,
      then(userPrefs) {
        this.setState({userPrefs});
        userPrefs.forEach(userPref => {
          getRestaurantById(userPref).then(restaurant => {
            let newObject = {};
            newObject[restaurant.id] = restaurant;
            let allRestaurants = Object.assign(this.state.allRestaurants, newObject);
            this.setState({allRestaurants});
          });
        });
      }
    })

    this.ref.push(base.syncState(`users/${this.props.uid}/selectedFriends`, {
      context: this,
      state: 'selectedFriends',
      asArray: true
    }));
    this.ref.push(base.syncState(`users/${this.props.uid}/chosenRestaurants`, {
      context: this,
      state: 'chosenRestaurants',
      asArray: true
    }));
  }
  componentWillUnmount() {
    this.ref.forEach(ref => base.removeBinding(ref));
  }
  updateSelectedFriends(selectedFriends) {
    this.setState({selectedFriends});
  }
  updateChosenRestaurants(chosenRestaurants) {
    this.setState({chosenRestaurants});
  }
  updateAllRestaurants(friendChoices) {
    friendChoices.forEach(friendChoice => {
      if ( !(friendChoice in this.state.allRestaurants) ) {
        getRestaurantById(friendChoice).then(restaurant => {
          let newObject = {};
          newObject[restaurant.id] = restaurant;
          let allRestaurants = Object.assign(this.state.allRestaurants, newObject);
          this.setState({allRestaurants});
        });
      }
    })
  }

  render () {

    return (
      <div>

        <Friends uid={this.props.uid} handleCheck={this.updateSelectedFriends}/>
        <ChooseContainer
          selectedFriends={this.state.selectedFriends}
          userPrefs={this.state.userPrefs}
          uid={this.props.uid}
          chosenRestaurants={this.state.chosenRestaurants}
          allRestaurants={this.state.allRestaurants}
          handleCheck={this.updateChosenRestaurants}
          updateAllRestaurants={this.updateAllRestaurants}/>
      </div>
    )
  }
}

export default Home;
