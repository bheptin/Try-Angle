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
      <div className="center-block" style={{width: "30%"}}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group" className="center-block">
            <label>Email address</label>
            <input type="email" ref="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We never share your email with anyone else.</small>
          </div>
          <div className="form-group" className="center-block">
            <label>Password</label>
            <input type="password" ref="password" className="form-control" id="exampleInputPassword" placeholder="Password"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <Link to="signup"><button className="btn btn-secondary">Sign Up!</button></Link>
      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Login;
