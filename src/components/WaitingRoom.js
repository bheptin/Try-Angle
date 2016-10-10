import React, { Component } from 'react';
import _ from 'lodash';
import base from '../config/ReBase';

class WaitingRoom extends Component {
  constructor() {
    super();
    this.state = { readyToGo: {} };
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    let { partyId, showNav } = this.props;
    showNav();
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
    let uid = base.auth().currentUser ? base.auth().currentUser.uid : localStorage.currentUser;
    friends = friends.filter(friend => friend !== uid);
    friends.forEach(friend => {
      base.push(`users/${uid}/previouslyDinedWith`, {
        data: friend
      })
    });
  }
  handleClick() {
    let uid = base.auth().currentUser ? base.auth().currentUser.uid : localStorage.currentUser;
    let partyId = this.props.partyId || localStorage.partyId;
    base.update(`users/${uid}`, {data: {partyId: null}});
    base.fetch(`parties/${partyId}/readyToGo`, {
      context: this
    }).then(readyToGo => {
      let partyGoers = Object.keys(readyToGo);
      if ( partyGoers.length < 3 ) {
        partyGoers.forEach(partyGoer => {
          base.update(`users/${partyGoer}`, {data: {partyId: null}});
        })
      }
    })
    this.context.router.push("choose-friends");
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
      <div>
        <div className="waiting-room-container">
          {boxes}
        </div>
        <button className="btn btn-primary" onClick={this.handleClick}>Change of Plans</button>
      </div>
    )
  }
}

WaitingRoom.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default WaitingRoom;
