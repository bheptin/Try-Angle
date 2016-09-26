import React, { Component } from 'react';
import MobileSelect from './MobileSelect';
import base from '../config/ReBase';
import _ from 'lodash';

class Choose extends Component {
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
          let newFriendChoices = Object.assign({}, this.state.friendsChoices, {friendId: friendChoices});
          this.setState({friendsChoices: newFriendChoices});
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
  listenForFriendChanges(friends) {
    friends.forEach(friendId => {
      if (friendId !== this.props.uid) {
        this.ref[friendId] = base.listenTo(`users/${friendId}/chosenRestaurants`, {
          context: this,
          asArray: true,
          then(friendChoices) {
            let newFriendChoices = Object.assign({}, this.state.friendsChoices, {friendId: friendChoices});
            this.setState({friendsChoices: newFriendChoices});
          }
        });
      }
    })
  }
  handleChange() {
    let chosenRestaurants = _.keysIn(_.pickBy(this.refs, 'checked'));
    this.props.handleCheck(chosenRestaurants);
  }
  render () {
    let myCheckboxes = this.props.userPrefs.map((restaurant, index) => (
      <div>
        <label key={index}>
          <input type="checkbox" aria-label="..." ref={restaurant.id} onChange={this.handleChange}/>
          {restaurant.name}
        </label>
      </div>
    ));
    let theirCheckboxes = _.valuesIn(this.state.friendsChoices).map((friendChoices, index) => (
      <div className="their-choices" key={index}>
        <h2>Friend Choices</h2>
        {friendChoices.map((friendChoice, index) => (
          <label key={index}><input type="checkbox" ref={friendChoice} onChange={this.handleChange}/>{friendChoice}</label>
        ))}
      </div>
    ));
    return (
      <div style={{border: "3px solid green"}}>
        <div className="my-choices">
          <h2>My Choices</h2>
          {myCheckboxes}
          <MobileSelect myChoices={this.props.userPrefs}/>
        </div>
        {theirCheckboxes}
      </div>
    )
  }
}

export default Choose;
