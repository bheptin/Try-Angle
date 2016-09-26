import React, { Component, cloneElement } from 'react';
import '../App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {user: {}};
    this.addUserToState = this.addUserToState.bind(this);
  }
  addUserToState(user, path) {
    this.setState({user});
    console.log("user id is ", this.state.user.uid);
    this.context.router.push(`/${path}`);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Try-Angle</h2>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Try-Angle</a>
              </div>


            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><a href="home">Home <span className="sr-only">(current)</span></a></li>
                <li><a href="profile">Profile</a></li>
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
          addUserToState: this.addUserToState,
          uid: this.state.user.uid
        })}
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default App;
