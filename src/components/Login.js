import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { Link } from 'react-router';
import MediaQuery from 'react-responsive';
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
      base.fetch(`users/${userData.uid}/partyId`, {
        context: this,
        then(partyId){
          if (partyId) {
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
      this.context.router.push("profile");
    }
  }
  handleSubmit (existingUser, event) {
    event.preventDefault();
    let email = event.target.elements[0].value;
    let password = event.target.elements[1].value;
    if (existingUser) {
      base.authWithPassword ({email, password}, this.authHandler);
    } else {
      base.createUser({email, password}, this.userHandler)
    }
  }

  render () {
    return (
        <div>
          <LoginForm handleSubmit={this.handleSubmit}/>
          <MediaQuery query='(min-width: 993px)'>
            <div>
              <p>Have you ever experienced this?</p>
              <img style={{width: "300px", height: "300px", textAlign: "center"}} src="https://cdn.meme.am/instances/500x/59857655.jpg"/>
              <p> With Try-Angle, take out the guesswork of where to eat! Pair with one or more frineds to make eating out an easy fix!</p>
            </div>
          </MediaQuery>
      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Login;
