import React, { Component } from 'react';
import base from '../config/ReBase';
import _ from 'lodash';

class Choose extends Component {
  constructor() {
    super();
    this.state = {
      friendsChoices: [],
      myOptions: []
    };
  }
  componentWillReceiveProps(nextProps) {
    nextProps.selectedFriends.forEach(friendId => {
      base.fetch(`users/${friendId}/chosenRestaurants`, {
        context: this,
        asArray: true,
        then(friendChoices){
          this.updateMyChoices(friendChoices);
        }
      });
      base.listenTo(`users/${friendId}/chosenRestaurants`, {
        context: this,
        asArray: true,
        then(friendChoices) {
          this.updateMyChoices(friendChoices);
        }
      })
    })
  }
  updateMyChoices(friendChoices) {
    let newFriendsChoices = this.state.friendsChoices;
    newFriendsChoices = _.union(newFriendsChoices, friendChoices);
    this.setState({friendsChoices: newFriendsChoices});
    let myChoices = this.props.foodPrefs;
    newMyChoices = _.union(newMyChoices, this.state.friendsChoices);
    this.setState({myOptions: newMyChoices});
  }
  render () {
    let checkboxes = this.state.myOptions.map(choice => <label><input type="checkbox"/>{choice}</label>);
    return (
      <div style={{border: "3px solid green"}}>
        <h2>Here's your options! Pick 3:</h2>
        <ul>
          {checkboxes}
        </ul>
      </div>
    )
  }
}

export default Choose;
