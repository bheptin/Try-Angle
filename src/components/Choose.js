import React, { Component } from 'react';
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
    base.reset();
    this.listenForFriendChanges(nextProps);
  }
  componentDidMount(){
    this.props.selectedFriends.forEach(friendId => {
      base.fetch(`users/${friendId}/chosenRestaurants`, {
        context: this,
        asArray: true,
        then(friendChoices) {
          this.state.friendsChoices[friendId] = friendChoices;
          this.setState(this.state);
        }
      });
    });
    this.listenForFriendChanges(this.props);
  }
  componentWillUnmount(){
    base.reset();
  }
  listenForFriendChanges(props) {
    props.selectedFriends.forEach(friendId => {
      if (friendId !== this.props.uid) {
        base.listenTo(`users/${friendId}/chosenRestaurants`, {
          context: this,
          asArray: true,
          then(friendChoices) {
            this.state.friendsChoices[friendId] = friendChoices;
            this.setState(this.state);
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
      <label key={index}>
        <input type="checkbox" aria-label="..." ref={restaurant.id} onChange={this.handleChange}/>
        {restaurant.name}
      </label>
    ));
    let mySelects = this.props.userPrefs.map((restaurant, index) => (
      <option key={index} multiple>
        {restaurant.name}
      </option>
    ));
    let theirCheckboxes = _.valuesIn(this.state.friendsChoices).map((friendChoices, index) => (
      <div className="their-choices" key={index}>
        <h2>Friend Choices</h2>
        {friendChoices.map((friendChoice, index) => (
          <label key={index}><input type="checkbox" ref={friendChoice} onChange={this.handleChange}/>{friendChoice}</label>
        ))}
      </div>
    ));
    let theirSelects = _.valuesIn(this.state.friendsChoices).map((friendChoices, index) => (
      <select className="mobile" key={index} multiple>
        Friend Choices
        {friendChoices.map((friendChoice, index) => (
          <option key={index}>{friendChoice}</option>
        ))}
      </select>
    ));
    return (
      <div style={{border: "3px solid green"}}>
        <div className="my-choices">
          <h2>My Choices</h2>
          {myCheckboxes}
        </div>
        <select className="mobile" multiple>
          My Choices
          {mySelects}
        </select>
        {theirCheckboxes}
        {theirSelects}
      </div>
    )
  }
}

export default Choose;
