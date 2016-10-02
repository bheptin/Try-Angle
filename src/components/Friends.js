import React, { Component } from 'react';
import base from '../config/ReBase';
import _ from 'lodash';
import randomstring from 'randomstring';


class Friends extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    let partyId = randomstring.generate();
    this.props.addPartyId(partyId);
    let currentUser = base.auth().currentUser.uid;
    let selectedFriends = _.keysIn(_.pickBy(this.refs, 'checked'));
    let attendees = selectedFriends;
    attendees.push(currentUser);
    base.post(`parties/${partyId}`, {
      data: {
        invited: attendees,
        attending: [currentUser],
        venue: null
      }
    });
    attendees.forEach(attendee => {
      base.post(`users/${attendee}/partyId`, {data: partyId});
      base.post(`parties/${partyId}/readyToGo/${attendee}`, {data: false});
    });
    this.context.router.push("choose-restaurants");
  }
  render () {
    let friendsList = this.props.users.filter(user => user.key !== this.props.uid).map((user, index) => (
      <li key={index}>
        <h4>{user.personalInfo.firstName} {user.personalInfo.lastName}</h4>
        <input ref={user.key} type="checkbox"/>
      </li>
    ));
    return(
      <div className="Friends">
        <h3>Who do you want to eat with?</h3>
        <ul style={{listStyleType: "none"}}>
          {friendsList}
        </ul>
        <button onClick={this.handleClick}>Next</button>
      </div>
    )
  }

}

Friends.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Friends;
