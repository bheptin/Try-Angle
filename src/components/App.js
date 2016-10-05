import React, { Component, cloneElement } from 'react';
import { Link } from 'react-router';
import { getRestaurants } from '../config/api';
import base from '../config/ReBase';
import '../App.css';
import favicon from '../favicon.ico';

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
    this.listenForInvite = this.listenForInvite.bind(this);
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      let { latitude, longitude } = position.coords;
      getRestaurants(latitude, longitude).then(allRestaurants => this.setState({allRestaurants}));
      base.fetch(`users`, {
        context: this,
        asArray: true,
        then(users) {
          this.setState({users})
        }
      });
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  listenForInvite(userId) {
    this.ref = base.listenTo(`users/${userId}`, {
      context: this,
      then(userInfo) {
        if (userInfo.partyId && !this.state.partyId) {
          this.addPartyId(userInfo.partyId);
          this.context.router.push("invitation");
        }
      }
    })
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
          <div className="animated bounce" id="Head"><p>tryAngle</p></div>
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
          showNav: this.showNav,
          listenForInvite: this.listenForInvite
        })}
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default App;

/*          <Link style={{float: "right", margin: "8px", color: "#DADBEC"}} to="/profile">Profile</Link>
          <Link to="/home" style={{float: "right", margin: "8px", color: "#DADBEC"}}>Home<span className="sr-only">(current)</span></Link>*/
