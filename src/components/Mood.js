import React, { Component } from 'react';
import _ from 'lodash';

class Mood extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    let chosenRestaurants = _.keysIn(_.pickBy(this.refs, 'checked'));
    this.props.handleCheck(chosenRestaurants);
  }
  render () {
    let checkboxes = this.props.userPrefs.map((restaurant, index) => (
      <label key={index}>
        <input type="checkbox" aria-label="..." ref={restaurant.id} onChange={this.handleChange}/>
        {restaurant.name}
      </label>
    ));
    return (
      <div>
        {checkboxes}
      </div>
    )
  }
}

export default Mood;
