import React, { Component } from 'react';
import base from '../config/ReBase';
import _ from 'lodash';
import randomstring from 'randomstring';


class Friends extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visibleFriends: [],
      filteredUsers: [],
      userCanProceed: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
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
    if ( _.keysIn(this.refs).length ) {
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
  }
  handleChange(event) {
    let searchTerm = event.target.value.toLowerCase();
    let uid = base.auth().currentUser.uid;
    if (searchTerm.length) {
      let filteredUsers = this.props.users.filter(user => {
        let { firstName, lastName } = user.personalInfo;
        return firstName.toLowerCase().includes(searchTerm) || lastName.toLowerCase().includes(searchTerm)
      }).filter(user => user.key !== uid);
      this.setState({filteredUsers})
    } else {
      this.setState({filteredUsers: []})
    }
  }
  handleCheck() {
    if ( _.keysIn(this.refs).length ) {
      this.setState({userCanProceed: true});
    } else {
      this.setState({userCanProceed: false});
    }
  }
  render () {
    let uid = base.auth().currentUser.uid;
    let friendsList = this.props.users.filter(user => user.key !== uid && this.state.visibleFriends.includes(user.key));
    friendsList = friendsList.map((user, index) => (
      <li key={index}>
        <h4>{user.personalInfo.firstName} {user.personalInfo.lastName}</h4>
        <input ref={user.key} onChange={this.handleCheck} type="checkbox"/>
      </li>
    ));
    let filteredUsersList = this.state.filteredUsers.map((filteredUser, index) => (
      <li key={index}>
        <h4>{filteredUser.personalInfo.firstName} {filteredUser.personalInfo.lastName}</h4>
        <input ref={filteredUser.key} onChange={this.handleCheck} type="checkbox"/>
      </li>
    ));
    return(
      <div className="Friends container-fluid">
        <h3>Who would you like to enjoy a meal with?</h3>
        <div className="row">
          <ul className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" style={{listStyleType: "none"}}>
            <input className="friends-search" type="text" placeholder="search for someone!" onChange={this.handleChange}/>
            {filteredUsersList}
            {friendsList}
          </ul>
          <img className="img-circle hidden-xs col-sm-2 col-md-2 col-lg-4 col-xl-4 col-sm-offset-1 col-md-offset-2 col-lg-offset-2 col-xl-offset-2" src="http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/new_years_healthy_eating_slideshow/getty_rm_photo_of_friends_eating_appetizers.jpg"/>
        </div>
        <div className="row">
          <button onClick={this.handleClick} type="button" className={`btn btn-primary btn-sm col-xs-10 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xs-offset-1 col-sm-offset-2 col-md-offset-2 col-lg-offset-2 col-xl-offset-2 ${this.state.userCanProceed ? "active" : "disabled"}`}>Next</button>
        </div>
      </div>
    )
  }

}

Friends.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Friends;
