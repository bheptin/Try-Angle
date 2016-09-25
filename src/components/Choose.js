import React, { Component } from 'react';
import base from '../config/ReBase';
import _ from 'lodash';

class Choose extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillReceiveProps(nextProps){
    nextProps.selectedFriends.forEach(friendId => {
      this.state[friendId] = [];
      this.setState(this.state);
      base.syncState(`users/${friendId}/chosenRestaurants`, {
        context: this,
        state: friendId,
        asArray: true
      });
    })
  }
  render () {
    // let commonChoices = stuff to combine all state stuff
    // let checkboxes = commonChoices.map(choice => <label><input type="checkbox"/>{choice}</label>);
    return (
      <div style={{border: "3px solid green"}}>
        <h2>Here is your options! Pick 3:</h2>
        <ul>
        </ul>
      </div>
    )
  }
}

export default Choose;
