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
            <div className="signup" style={{float: "right", width: "300px", height: "300px", marginRight: "200px", textAlign: "center"}}>
              <p style={{fontSize: "20px", color: "#6798cd"}}>Have you ever experienced this?</p>
              <img style={{width: "200px", height: "200px", textAlign: "center"}} src="https://cdn.meme.am/instances/500x/59857655.jpg"/>
              <p style={{fontSize: "10px", color: "#6798cd"}}> With Try-Angle, take the guesswork of where to eat out! Pair with one or more frineds to make eating out an easy fix!</p>
              <Link to="signup"><button type="button" className="btn btn-primary btn-sm">Sign UP!</button></Link>
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
