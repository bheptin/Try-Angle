import React, { Component } from 'react';
import base from '../config/ReBase';
import _ from 'lodash';
import randomstring from 'randomstring';


class Friends extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visibleFriends: [],
      filteredUsers: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    let uid = base.auth().currentUser.uid;
    base.fetch(`users/${uid}/previouslyDinedWith`, {
      context: this,
      asArray: true,
      then(friends) {
        console.log(friends);
        this.setState({visibleFriends: friends});
      }
    })
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
  handleChange(event) {
    let searchTerm = event.target.value;
    if (searchTerm.length) {
      let filteredUsers = this.props.users.filter(user => {
        return user.personalInfo.firstName.toLowerCase().includes(searchTerm) || user.personalInfo.lastName.toLowerCase().includes(searchTerm)
      })
      this.setState({filteredUsers})
    } else {
      this.setState({filteredUsers: []})
    }
  }
  render () {
    let uid = base.auth().currentUser.uid;
    let friendsList = this.props.users.filter(user => user.key !== uid && this.state.visibleFriends.includes(user.key));
    friendsList = friendsList.map((user, index) => (
      <li key={index}>
        <h4>{user.personalInfo.firstName} {user.personalInfo.lastName}</h4>
        <input ref={user.key} type="checkbox"/>
      </li>
    ));
    let filteredUsersList = this.state.filteredUsers.map(filteredUser => <li>
      <h4>{filteredUser.personalInfo.firstName} {filteredUser.personalInfo.lastName}</h4>
      <input ref={filteredUser.key} type="checkbox"/>
    </li>);
    return(
      <div className="Friends">
        <h3>Who would you like to enjoy a meal with?</h3>
        <img style={{width: "300px", height: "250px", float: "right", marginRight: "100px"}} src="http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/new_years_healthy_eating_slideshow/getty_rm_photo_of_friends_eating_appetizers.jpg"  className="img-circle"/>

        <ul style={{listStyleType: "none"}}>
          <input type="text" placeholder="search for someone!" onChange={this.handleChange}/>
          {filteredUsersList}
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
