import React, { Component } from 'react';
import base from './config/ReBase';

class Mood extends Component {
  constructor() {
    super();
    this.state = {userPrefs: []};
  }
  componentDidMount() {
    base.fetch('users/${this.props.uid}/foodPrefs', {
      context: this,
      asArray: true,
      then(data){
        console.log(data);
      }
    });
  }
  render () {
    let checkboxes = this.state.userPrefs.map(restaurant => {
      <label><input type="checkbox" aria-label="..."/>{restaurant.name}</label>
    });
    return (
      <div>
        {checkboxes}
      </div>
    )
  }
}

export default Mood;
