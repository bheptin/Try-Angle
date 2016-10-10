import React, { Component } from 'react';
import base from '../config/ReBase';
import _ from 'lodash';
import randomstring from 'randomstring';
import Friends from '../components/Friends';

class FriendsContainer extends Component {
  constructor () {
    super();
    this.state = {
      visibleFriends: [],
      checkedFriends: [],
      searchTerm: "",
      userCanProceed: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.nameInSearch = this.nameInSearch.bind(this);
  }
  componentDidMount() {
    this.props.showNav();
    let uid = base.auth().currentUser ? base.auth().currentUser.uid : localStorage.currentUser;
    base.fetch(`users/${uid}/previouslyDinedWith`, {
      context: this,
      asArray: true
    }).then(friends => this.setState({visibleFriends: friends}));
  }
  handleClick() {
    if ( this.state.checkedFriends.length ) {
      let partyId = randomstring.generate();
      this.props.addPartyId(partyId);
      let uid = base.auth().currentUser.uid;
      let selectedFriends = this.state.checkedFriends;
      let attendees = [...selectedFriends, uid];
      base.post(`parties/${partyId}`, {
        data: {
          invited: attendees,
          attending: [uid],
          venue: null
        }
      });
      attendees.forEach(attendee => {
        base.post(`users/${attendee}/partyId`, {data: partyId});
        base.post(`parties/${partyId}/readyToGo/${attendee}`, {data: false});
      });
      this.context.router.push("choose-restaurants");
    }
  }
  handleChange(event) {
    let searchTerm = event.target.value.toLowerCase();
    this.setState({searchTerm});
  }
  handleCheck(friendId, event) {
    if (event.target.checked) {
      let checkedFriends = [...this.state.checkedFriends, friendId];
      this.setState({checkedFriends, searchTerm: "", userCanProceed: true});
    } else {
      let checkedFriends = _.without(this.state.checkedFriends, friendId);
      this.setState({
        checkedFriends,
        userCanProceed: checkedFriends.length ? true : false
      });
    }
  }
  nameInSearch(firstName, lastName) {
    firstName = firstName.toLowerCase();
    lastName = lastName.toLowerCase();
    return ( firstName.includes(this.state.searchTerm) || lastName.includes(this.state.searchTerm) ) && this.state.searchTerm.length;
  }
  render() {
    let uid = base.auth().currentUser ? base.auth().currentUser.uid : localStorage.currentUser;
    return (
      <Friends
        uid={uid}
        users={this.props.users}
        visibleFriends={this.state.visibleFriends}
        checkedFriends={this.state.checkedFriends}
        userCanProceed={this.state.userCanProceed}
        nameInSearch={this.nameInSearch}
        searchTerm={this.state.searchTerm}
        handleCheck={this.handleCheck}
        handleChange={this.handleChange}
        handleClick={this.handleClick}/>
    )
  }

}

FriendsContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default FriendsContainer;
