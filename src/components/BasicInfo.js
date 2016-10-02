import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import base from '../config/ReBase';

class BasicInfo extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      zipCode: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.ref = [];
    const endpoints = ['firstName', 'lastName', 'zipCode'];
    endpoints.forEach(endpoint => {
      this.ref.push(base.syncState(`users/${this.props.uid}/personalInfo/${endpoint}`, {
        context: this,
        state: endpoint
      }))
    })
  }
  componentWillUnmount() {
    this.ref.forEach(ref => base.removeBinding(ref));
  }
  handleChange(key, event) {
    let newObj = {};
    newObj[key] = event.target.value;
    let newState = Object.assign(this.state, newObj);
    this.setState(newState);
  }
  render () {
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" value={this.state.firstName || ""} placeholder="John" className="form-control" onChange={this.handleChange.bind(this, 'firstName')}/>
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" value={this.state.lastName || ""} placeholder="Doe" className="form-control" onChange={this.handleChange.bind(this, 'lastName')}/>
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input type="text" value={this.state.zipCode || ""} placeholder="Zip Code" className="form-control" onChange={this.handleChange.bind(this, 'zipCode')}/>
            </div>
        </div>
    </ReactCSSTransitionGroup>
    )
  }
}

export default BasicInfo;
