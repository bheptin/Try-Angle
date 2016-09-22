import React, { Component } from 'react';
import Choose from './Choose';
import Friends from './Friends.js';

class Home extends Component {
  render () {
    return (
      <div>
        <h4>Home</h4>
        <Friends uid={this.props.uid}/>
        <Choose/>
      </div>
    )
  }
}

export default Home;
