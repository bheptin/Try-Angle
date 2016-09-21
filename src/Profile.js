import React, { Component } from 'react';
import base from './config/ReBase';
import FoodPref from './FoodPref';

class Profile extends Component {
  handleSubmit(event) {
    event.preventDefault();
    base.post(`${this.props.uid}/personalInfo`, {
      data: {
        firstName: this.refs.first,
        lastName: this.refs.last
      }
    })
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-group">
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
        <FoodPref/>
      </div>
    )
  }
}

export default Profile;
