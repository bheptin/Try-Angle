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
          <h2>Try-Angle</h2>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#navbar" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Try-Angle</a>
              </div>


            <div className="collapse navbar-collapse" id="navbar">
              <ul className="nav navbar-nav">
                <li className="active"><Link to="/home">Home<span className="sr-only">(current)</span></Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </ul>
              <form className="navbar-form navbar-left">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search"/>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
          </div>
        </nav>
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
