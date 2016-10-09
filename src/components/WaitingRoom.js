import React, { Component } from 'react';
import _ from 'lodash';
import base from '../config/ReBase';

class WaitingRoom extends Component {
  constructor() {
    super();
    this.state = { readyToGo: {} };
  }
  componentWillMount() {
    let { partyId } = this.props;
    partyId = partyId || localStorage.partyId;
    this.ref = base.listenTo(`parties/${partyId}/readyToGo`, {
      context: this,
      then(readyToGo) {
        this.addToDinedWith(_.keysIn(readyToGo));
        this.setState({readyToGo});
        if ( !( _.includes(readyToGo, false) ) ) {
          this.context.router.push("angle-made");
        }
      }
    })
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  addToDinedWith(friends) {
    let userId = base.auth().currentUser.uid;
    friends = friends.filter(friend => friend !== userId);
    friends.forEach(friend => {
      base.push(`users/${userId}/previouslyDinedWith`, {
        data: friend
      })
    });
  }
  render() {
    let uid = base.auth().currentUser ? base.auth().currentUser.uid : localStorage.currentUser;
    let boxes = this.props.users.filter( user => _.keysIn(this.state.readyToGo).includes(user.key) )
      .map((user, index) => (
        <div key={index} style={{ border: this.state.readyToGo[user.key] ? "3px solid green" : "3px solid red" }}>
          <h2>{user.key !== uid ? `${user.personalInfo.firstName} is` : "You are"} {this.state.readyToGo[user.key] ? "" : "not"} ready to go</h2>
          {this.state.readyToGo[user.key] ? <i className="fa fa-cutlery" aria-hidden="true"></i> : null}
        </div>
      ))
    return (
      <div className="waiting-room-container">
        {boxes}
      </div>
    )
  }
}

WaitingRoom.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default WaitingRoom;
