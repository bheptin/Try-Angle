import React, { Component } from 'react';
import $ from 'jquery';
import '../login.css';

class LoginForm extends Component {
  componentDidMount() {
    $('.toggle').on('click', function() {
      $('.container').stop().addClass('active');
    });

    $('.close').on('click', function() {
      $('.container').stop().removeClass('active');
    });
  }
  render() {
    return (
      <div className="container login-form">
      	<div className="row">
      <div className="container">
        <div className="card"></div>
        <div className="card">
          <h1 className="title">Login</h1>
          <form onSubmit={this.props.handleSubmit.bind(this, true)}>
            <div className="input-container">
              <input type="text" id="Email" required="required"/>
              <label htmlFor="Email">Email</label>
              <div className="bar"></div>
            </div>
            <div className="input-container">
              <input type="password" id="Password" required="required"/>
              <label htmlFor="Password">Password</label>
              <div className="bar"></div>
            </div>
            <div className="button-container">
              <button><span>Go</span></button>
            </div>
            <div className="footer"><a href="#">Forgot your password?</a></div>
          </form>
        </div>
        <div className="card alt">
          <div className="toggle">
            {/*<i className="fa fa-pencil" aria-hidden="true"></i>*/}
          </div>
          <h1 className="title">Register
            <div className="close"></div>
          </h1>
          <form onSubmit={this.props.handleSubmit.bind(this, false)}>
            <div className="input-container">
              <input type="text" id="Email" required="required"/>
              <label htmlFor="Email">Email</label>
              <div className="bar"></div>
            </div>
            <div className="input-container">
              <input type="password" id="Password" required="required"/>
              <label htmlFor="Password">Password</label>
              <div className="bar"></div>
            </div>
            <div className="input-container">
              <input type="password" id="Repeat Password" required="required"/>
              <label htmlFor="Repeat Password">Repeat Password</label>
              <div className="bar"></div>
            </div>
            <div className="button-container">
              <button><span>Next</span></button>
            </div>
          </form>
        </div>
      </div>
      	</div>
      </div>
    )
  }
}

export default LoginForm;
