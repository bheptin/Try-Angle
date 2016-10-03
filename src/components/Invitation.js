import React, { Component } from 'react';
import base from '../config/ReBase';

class Invitation extends Component {
  constructor() {
    super();
    this.state = {invitees: []};
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    base.fetch(`parties/${this.props.partyId}/invited`, {
      context: this,
      asArray: true,
      then(invitees) {
        this.setState({invitees});
      }
    })
  }
  handleClick(willAttend) {
    if (willAttend) {
      base.push(`parties/${this.props.partyId}/attending`, {data: base.auth().currentUser.uid});
      this.context.router.push("choose-restaurants");
    } else {
      base.update(`parties/${this.props.partyId}/readyToGo/${base.auth().currentUser.uid}`, {data: null});
      base.update(`users/${base.auth().currentUser.uid}/partyId}`, {data: null});
      this.context.router.push("choose-friends");
    }
  }
  render() {
    let friends = this.props.users.filter(user => this.state.invitees.includes(user.key) && user.key !== base.auth().currentUser.uid);
    friends = friends.map(friend => `${friend.personalInfo.firstName} ${friend.personalInfo.lastName}`).join(", ");
    return (
      <div className="invite">
        <h2>Youve been invited to dine with {friends}</h2>
        <h2>Do you accept this invitation?</h2>
        <button onClick={this.handleClick.bind(this, true)}>Yes</button>
        <button onClick={this.handleClick.bind(this, false)}>No</button>
      </div>
    )
  }
}

Invitation.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Invitation;
