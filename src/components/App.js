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
      users: [],
      navIsVisible: false
    };
    this.addPartyId = this.addPartyId.bind(this);
    this.showNav = this.showNav.bind(this);
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
    localStorage.setItem('partyId', partyId);
  }
  showNav() {
    this.setState({navIsVisible: true});
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="animated bounce" id="Head"><a>tryAngle</a></div>
          <div style={this.state.navIsVisible ? {display: "block"} : {display: "none"}}>
            <Link style={{float: "right", margin: "8px", color: "#DADBEC"}} to="/profile">Profile</Link>
            <Link to="/login" style={{float: "right", margin: "8px", color: "#DADBEC"}}>Sign Out<span className="sr-only">(current)</span></Link>
          </div>
        </div>
        {cloneElement(this.props.children, {
          allRestaurants: this.state.allRestaurants,
          partyId: this.state.partyId,
          addPartyId: this.addPartyId,
          users: this.state.users,
          showNav: this.showNav
        })}
      </div>
    );
  }
}

export default App;

/*          <Link style={{float: "right", margin: "8px", color: "#DADBEC"}} to="/profile">Profile</Link>
          <Link to="/home" style={{float: "right", margin: "8px", color: "#DADBEC"}}>Home<span className="sr-only">(current)</span></Link>*/
