import React, { Component } from 'react';
import base from '../config/ReBase';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      personal: true,
      foodPrefs: false,
      allergies: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    base.post(`users/${this.props.uid}/personalInfo`, {
      data: {
        firstName: this.refs.first.value,
        lastName: this.refs.last.value
      }
    })
    this.setState({
      personal: false,
      foodPrefs: true,
      allergies: false
    })
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-group" style={!this.state.personal ? {display: 'none'} : null}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" ref="first" className="form-control" placeholder="John"/>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" ref="last" className="form-control" placeholder="Smith"/>
          </div>
          <button type="submit" className="btn btn-primary">Next</button>
        </form>
      </div>
    )
  }
}

export default Profile;
