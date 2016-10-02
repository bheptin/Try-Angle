import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import base from '../config/ReBase';
import _ from 'lodash';

class FoodPrefs extends Component {
  constructor() {
    super();
    this.state = { selectedRestaurants: [] };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    base.syncState(`users/${this.props.uid}/foodPrefs`, {
      context: this,
      state: 'selectedRestaurants',
      asArray: true
    })
  }
  handleChange() {
    let selectedRestaurants = _.keysIn(_.pickBy(this.refs, 'checked'));
    this.setState({selectedRestaurants});
  }
  render () {
    let checkBoxes = this.props.allRestaurants.map((restaurant, index) => (
      <label key={index}>
        <input type="checkbox"
          ref={restaurant.id}
          onChange={this.handleChange}
          checked={this.state.selectedRestaurants.includes(restaurant.id)}/>
        {restaurant.name}
      </label>
    ));
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div>
          <p>See any of your favorites? Let us know so we can craft your perfect dining experience!</p>
          {checkBoxes}
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}

export default FoodPrefs;
