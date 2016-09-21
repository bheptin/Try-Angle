import React, { Component } from 'react';
import Friends from './Friends.js';

class Home extends Component {
  render () {
    return (
      <div>
      <h4>Home</h4>
    <Friends uid={this.props.uid}/>

      </div>
    )
  }
}

export default Home;
