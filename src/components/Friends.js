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
        <h3>Who you like to enjoy a meal with?</h3>
        <img style={{width: "300px", height: "250px", float: "right", marginRight: "100px"}} src="http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/new_years_healthy_eating_slideshow/getty_rm_photo_of_friends_eating_appetizers.jpg"  className="img-circle"/>

        <ul style={{listStyleType: "none"}}>
          {friendsList}
        </ul>

        <button style={{marginLeft: "140px"}} onClick={this.handleClick} type="button" className="btn btn-primary btn-sm">Next</button>
      </div>
    )
  }

}

Friends.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Friends;
