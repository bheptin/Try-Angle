import React, { Component } from 'react';
import base from './config/ReBase';
import _ from 'lodash';

class Choose extends Component {
  constructor() {
    super();
    this.state = {
      friendsChoices: [],
      myChoices: []
    };
  }
  componentDidMount() {
    base.fetch(`users/${this.props.uid}/chosenRestaurants`, {
      context: this,
      asArray: true,
      then(chosenRestaurants){
        this.setState({chosenRestaurants});
      }
    });

    base.fetch(`users/${this.props.uid}/selectedFriends`, {
      context: this,
      asArray: true,
      then(selectedFriends){
        selectedFriends.forEach(friendId => {
          base.listenTo(`users/${friendId}/chosenRestaurants`, {
            context: this,
            asArray: true,
            then(friendChoices){
              let newFriendChoices = this.state.friendsChoices;
              newFriendChoices = _.union(newFriendChoices, friendChoices);
              let newMyChoices = this.state.myChoices;
              newMyChoices = _.union(newMyChoices, newFriendChoices);
              this.setState({myChoices: newMyChoices});
            }
          })
        })
      }
    });
  }
  render () {
    return (
      <ul>
        {this.state.myChoices}
      </ul>
    )
  }
}

export default Choose;
