import React, { Component, cloneElement } from 'react';
import { Link } from 'react-router';
import { getRestaurants } from '../config/api';
import base from '../config/ReBase';
import '../App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {user: {}, allRestaurants: []};
    this.addUserToState = this.addUserToState.bind(this);
  }
  addUserToState(user, path) {
    this.setState({user});
    console.log("user id is ", this.state.user.uid);
    this.context.router.push(`/${path}`);
  }
  componentDidMount() {
    getRestaurants().then(allRestaurants => this.setState({allRestaurants}));
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
          addUserToState: this.addUserToState,
          uid: this.state.user.uid,
          allRestaurants: this.state.allRestaurants
        })}
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default App;
