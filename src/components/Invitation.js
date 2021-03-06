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
      base.update(`parties/${this.props.partyId}/readyToGo`, {
        data: {[base.auth().currentUser.uid]: null}
      });
      base.update(`users/${base.auth().currentUser.uid}`, {
        data: {
          partyId: null
        }
      });
      this.context.router.push("choose-friends");
    }
  }
  render() {
    let uid = base.auth().currentUser ? base.auth().currentUser.uid : localStorage.currentUser;
    let friends = this.props.users.filter(user => this.state.invitees.includes(user.key) && user.key !== uid);
    let friendsString = friends.map(friend => `${friend.personalInfo.firstName} ${friend.personalInfo.lastName}`).join(", ");
    if (friends.length > 1) {
      let lastComma = friendsString.lastIndexOf(',');
      friendsString = friendsString.substring(0, lastComma) + ' and' + friendsString.substring(lastComma + 1);
    }
    return (
      <div className="invitation">
        <div className="invite">
          <h2 className="text-center">You&apos;ve been invited to dine with {friendsString}.<br>
               </br>Do you accept this invitation?</h2>
        </div>
        <div className="inviteButtons">
          <button style={{marginRight: "3px"}} onClick={this.handleClick.bind(this, true)} className="btn btn-primary">Yes</button>
          <button style={{marginLeft: "3px"}} onClick={this.handleClick.bind(this, false)} className="btn btn-primary">No</button>
        </div>
      </div>
    )
  }
}

Invitation.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Invitation;
