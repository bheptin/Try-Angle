import React, { Component } from 'react';
import base from './config/ReBase';

class Login extends Component {
    constructor () {
      super();
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    authHandler (error, userData) {
      if (error) {
        console.log(error)
      } else {
        console.log(userData)
      }

    }
handleSubmit (event) {
  let email = this.refs.email.value
  let password = this.refs.password.value
  base.authWithPassword ({email, password},
  this.authHandler);
  
}


  render () {
    return (

    <div>

      <form onSubmit={this.handleSubmit}>
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
    </div>
    )
  }
}

export default Login;
