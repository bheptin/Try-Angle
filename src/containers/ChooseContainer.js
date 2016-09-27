import React, { Component } from 'react';
import Choose from '../components/Choose';
import base from '../config/ReBase';
import getRestaurantById from '../config/api';
import _ from 'lodash';

class ChooseContainer extends Component {
  constructor() {
    super();
    this.state = {friendsChoices: {}};
    this.listenForFriendChanges = this.listenForFriendChanges.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    let currentListeners = _.keysIn(this.ref);
    let listenersToRemove = _.difference(currentListeners, nextProps.selectedFriends);
    let listenersToAdd = _.difference(nextProps.selectedFriends, currentListeners);
    this.listenForFriendChanges(listenersToAdd);
    this.removeListeners(listenersToRemove);
  }
  componentDidMount(){
    this.ref = {};
    this.props.selectedFriends.forEach(friendId => {
      base.fetch(`users/${friendId}/chosenRestaurants`, {
        context: this,
        asArray: true,
        then(friendChoices) {
          this.updateFriendChoices(friendChoices, friendId);
        }
      });
    });
    this.listenForFriendChanges(this.props.selectedFriends);
  }
  componentWillUnmount(){
    this.removeListeners(_.keysIn(this.ref));
  }
  removeListeners(listeners) {
    listeners.forEach(listener => {
      base.removeBinding(this.ref[listener]);
    })
  }
  updateFriendChoices(friendChoices, friendId) {
    let newObject = {};
    newObject[friendId] = friendChoices;
    let friendsChoices = Object.assign(this.state.friendsChoices, newObject);
    this.setState({friendsChoices});
    this.props.updateAllRestaurants(friendChoices);
  }
  listenForFriendChanges(friends) {
    friends.forEach(friendId => {
      if (friendId !== this.props.uid) {
        this.ref[friendId] = base.listenTo(`users/${friendId}/chosenRestaurants`, {
          context: this,
          asArray: true,
          then(friendChoices) {
            this.updateFriendChoices(friendChoices, friendId);
          }
        });
      }
    })
  }
  handleChange(restaurantId, event) {
    console.log(event.target.checked);
    if (event.target.checked) {
      let chosenRestaurants = [...this.props.chosenRestaurants, restaurantId];
      chosenRestaurants = _.uniq(chosenRestaurants);
      this.props.handleCheck(chosenRestaurants);
    } else {
      let chosenRestaurants = _.without(this.props.chosenRestaurants, restaurantId);
      this.props.handleCheck(chosenRestaurants);
    }
  }
  render () {
    return <Choose {...this.props} handleChange={this.handleChange} friendsChoices={this.state.friendsChoices}/>
  }
}

export default ChooseContainer;
