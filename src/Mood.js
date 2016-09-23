import React, { Component } from 'react';
import Choose from './Choose';
import base from './config/ReBase';
import _ from 'lodash';

class Mood extends Component {
  constructor() {
    super();
    this.state = {
      userPrefs: [],
      selected: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    base.fetch(`users/${this.props.uid}/foodPrefs`, {
      context: this,
      asArray: true,
      then(data){
        this.setState({userPrefs: data})
      }
    });
    base.syncState(`users/${this.props.uid}/chosenRestaurants`, {
      context: this,
      state: 'selected',
      asArray: true
    });
  }
  handleChange() {
    let selectedRestaurants = _.keysIn(_.pickBy(this.refs, 'checked'));
    this.setState({selected: selectedRestaurants});
  }
  render () {
    let checkboxes = this.state.userPrefs.map((restaurant, index) => (
      <label key={index}><input type="checkbox" aria-label="..." ref={restaurant} onChange={this.handleChange}/>{restaurant}</label>
    ));
    return (
      <div>
        {checkboxes}
        <Choose uid={this.props.uid}/>
      </div>
    )
  }
}

export default Mood;
