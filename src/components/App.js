import React, { Component, cloneElement } from 'react';
import { Link } from 'react-router';
import { getRestaurants } from '../config/api';
import base from '../config/ReBase';
import '../App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      allRestaurants: [],
      partyId: null,
      users: []
    };
    this.addPartyId = this.addPartyId.bind(this);
  }
  componentDidMount() {
    getRestaurants().then(allRestaurants => this.setState({allRestaurants}));
    base.fetch(`users`, {
      context: this,
      asArray: true,
      then(users) {
        this.setState({users})
      }
    });
  }
  addPartyId(partyId) {
    this.setState({partyId});
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <input type="text" className="form-control" style={{width: "25%", float: "right"}} placeholder="Search"/>
          <Link style={{float: "right", margin: "8px", color: "#DADBEC"}} to="/profile">Profile</Link>
          <Link to="/home" style={{float: "right", margin: "8px", color: "#DADBEC"}}>Home<span className="sr-only">(current)</span></Link>
          <div className="animated bounce" id="Head"><a>Try-Angle</a></div>
        </div>
        {cloneElement(this.props.children, {
          allRestaurants: this.state.allRestaurants,
          partyId: this.state.partyId,
          addPartyId: this.addPartyId,
          users: this.state.users
        })}
      </div>
    );
  }
}

export default App;
