import React, { Component } from 'react';
import base from './config/ReBase';

class Signup extends Component {
  constructor () {
    super();
      this.handleSubmit = this.handleSubmit.bind(this);

  }
handleSubmit (event) {
  event.preventDefault();
  let first = this.refs.first.value
  let last = this.refs.last.value
  let email = this.refs.email.value
  let password = this.refs.password.value;

  base.createUser ({
    email, password
  },this.userHandler)
}
userHandler (error, userData){
  if (error) {
    console.log(error);
  } else {
    console.log(userData.uid)
  }
}
  render () {
    return (
<form onSubmit={this.handleSubmit} className="form-group">
  <div className="form-group">
    <label>First Name</label>
        <input type="text" ref="first" className="form-control" placeholder="John"/>
  </div>
  <div className="form-group">
    <label>Last Name</label>
        <input type="text" ref="last" className="form-control" placeholder="Smith"/>
  </div>
  <div className="form-group">
    <label>Email address</label>
    <input type="email" ref="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label>Password</label>
    <input type="password" ref="password" className="form-control" id="exampleInputPassword" placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    )
  }
}

export default Signup;
