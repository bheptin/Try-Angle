import React, { Component } from 'react';
import { Link } from 'react-router';
import base from '../config/ReBase';

class Login extends Component {
  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authHandler = this.authHandler.bind(this);
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
                console.log(party);
                this.context.router.push( (userData.uid in party.selections) ? "waiting-room" : "invitation" );
              }
            })
          } else {
            this.context.router.push("choose-friends");
          }
        }
      });
    }
  }
  handleSubmit (event) {
    event.preventDefault();
    let email = this.refs.email.value
    let password = this.refs.password.value
    base.authWithPassword ({email, password}, this.authHandler);
  }

  render () {
    return (
        <div>
        <form onSubmit={this.handleSubmit}>
          <div className="signup" style={{float: "right", width: "300px", height: "300px", marginRight: "200px", textAlign: "center"}}>
            <p>Have you ever experienced this?</p>
            <img style={{width: "300px", height: "300px", textAlign: "center"}} src="https://cdn.meme.am/instances/500x/59857655.jpg"/>
            <p> With Try-Angle, take the guesswork of where to eat out! Pair with one or more frineds to make eating out an easy fix!</p>
            <Link to="signup"><button className="btn btn-secondary">Sign Up!</button></Link>
          </div>

          <div className="form-group" style={{float: "left", marginLeft: "30px"}}>
            <label>Email address</label>
            <input type="email" ref="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
            <label>Password</label>
            <input type="password" ref="password" className="form-control" id="exampleInputPassword" placeholder="Password"/>
            <button style={{marginTop: "10px"}}type="submit" className="btn btn-primary">Log in</button>
          </div>
        </form>

      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Login;
