import React, { Component } from 'react';
import LoginForm from './LoginForm';
import base from '../config/ReBase';

class Login extends Component {
  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.userHandler = this.userHandler.bind(this);
  }
  authHandler (error, userData) {
    if (error) {
      console.log(error)
    } else {
      localStorage.setItem('currentUser', userData.uid);
      base.fetch(`users/${userData.uid}/partyId`, {
        context: this,
        then(partyId){
          if (partyId) {
            console.log(partyId);
            this.props.addPartyId(partyId);
            base.fetch(`parties/${partyId}`, {
              context: this,
              then(party) {
                if (party.selections) {
                  this.context.router.push( (userData.uid in party.selections) ? "waiting-room" : "invitation" );
                } else {
                  this.context.router.push("invitation");
                }
              }
            })
          } else {
            this.props.listenForInvite(userData.uid);
            this.context.router.push("choose-friends");
          }
        }
      });
    }
  }
  userHandler (error, userData){
    if (error) {
      console.log(error);
    } else {
      localStorage.setItem('currentUser', userData.uid);
      this.props.listenForInvite(userData.uid);
      this.context.router.push("profile");
    }
  }
  handleSubmit (existingUser, event) {
    event.preventDefault();
    this.props.showNav();
    let email = event.target.elements[0].value;
    let password = event.target.elements[1].value;
    if (existingUser) {
      base.authWithPassword ({email, password}, this.authHandler);
    } else {
      base.createUser({email, password}, this.userHandler)
    }
  }

  render () {
    return <LoginForm handleSubmit={this.handleSubmit}/>
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Login;
