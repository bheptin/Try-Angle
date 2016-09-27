import React, { Component } from 'react';
import Select from './Select';
import base from '../config/ReBase';
import _ from 'lodash';
import AngleMade from './AngleMade.js';

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
          <img src={restaurant.image_url} style={{width: "40px", height: "40px"}} alt="..." className="img-thumbnail"/>
        </label>
      </div>
    ));
    let theirCheckboxes = _.valuesIn(this.state.friendsChoices).map((friendChoices, index) => (
      <div className="their-choices" key={index}>
        <h2>Friend Choices</h2>
        {friendChoices.map((friendChoice, index) => (
          <label key={index}><input type="checkbox" ref={friendChoice} onChange={this.handleChange}/>
          {friendChoice}
          <img src={this.props.userPrefs.images} style={{width: "40px", height: "40px"}} alt="..." className="img-thumbnail"/>
          </label>
        ))}
      </div>

    ));
    return (
      <div style={{border: "3px solid green"}}>
        <div className="my-choices">
          <h2>My Choices</h2>
          {myCheckboxes}
          <Select myChoices={this.props.userPrefs}/>
        </div>
        <div className="their-choices">
          {theirCheckboxes}
        </div>
        <AngleMade finalDecision={this.props.chosenRestaurants}/>
      </div>

    )
  }
}

export default Choose;
