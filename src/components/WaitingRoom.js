import React, { Component } from 'react';
import _ from 'lodash';
import base from '../config/ReBase';

class WaitingRoom extends Component {
  constructor() {
    super();
    this.state = { readyToGo: {} };
  }
  componentDidMount() {
    this.ref = base.listenTo(`parties/${this.props.partyId}/readyToGo`, {
      context: this,
      then(readyToGo) {
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
  render() {
    let boxes = this.props.users.filter( user => _.keysIn(this.state.readyToGo).includes(user.key) )
      .map(user => (
        <div style={{ border: this.state.readyToGo[user.key] ? "3px solid green" : "3px solid red" }}>
          <p>{user.personalInfo.firstName} is {this.state.readyToGo[user.key] ? "" : "not"} ready to go</p>
        </div>
      ))
    return (
      <div>
        <h1>Waiting Room</h1>
        {boxes}
      </div>
    )
  }
}

WaitingRoom.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default WaitingRoom;
