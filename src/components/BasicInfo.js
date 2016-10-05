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
      base.fetch(`users/${base.auth().currentUser.uid}/personalInfo/${endpoint}`, {
        context: this,
        then(name) {
          this.setState({[endpoint]: name});
        }
      })
    })
  }
  handleChange(key, event) {
    let newName = {[key]: event.target.value};
    base.post(`users/${base.auth().currentUser.uid}/personalInfo/${key}`, {
      data: event.target.value
    })
    this.setState(newName);
  }
  render () {
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div style={{display: "flex", alignItems: "center", margin: "40px 0 0 40px"}}>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" value={this.state.firstName || ""} placeholder="John" className="form-control" onChange={this.handleChange.bind(this, 'firstName')}/>
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" value={this.state.lastName || ""} placeholder="Doe" className="form-control" onChange={this.handleChange.bind(this, 'lastName')}/>
            </div>
            <Link to="choose-friends"><button className="btn btn-primary">Next</button></Link>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}

BasicInfo.contextTypes = {router: React.PropTypes.object.isRequired};

export default BasicInfo;
