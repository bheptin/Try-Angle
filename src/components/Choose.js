import React, { Component } from 'react';
import base from '../config/ReBase';
import _ from 'lodash';

class Choose extends Component {
  constructor() {
    super();
    this.state = {};
    this.syncStateForFriends = this.syncStateForFriends.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    base.reset();
    this.syncStateForFriends(nextProps);
  }
  componentDidMount(){
    this.syncStateForFriends(this.props);
  }
  componentWillUnmount(){
    base.reset();
  }
  syncStateForFriends(props) {
    props.selectedFriends.forEach(friendId => {
      if (friendId != this.props.uid) {
        this.state[friendId] = [];
        this.setState(this.state);
        base.syncState(`users/${friendId}/chosenRestaurants`, {
          context: this,
          state: friendId,
          asArray: true
        });
      }
    })
  }
  render () {

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
