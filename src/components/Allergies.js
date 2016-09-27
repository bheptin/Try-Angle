import React, { Component } from 'react';
import base from '../config/ReBase';
import _ from 'lodash';

const allergies = ["Crustacean shellfish (e.g., crab, lobster, shrimp)", "Eggs", "Fish (e.g., bass, flounder, cod)", "Milk", "Peanuts", "Soybeans", "Tree nuts (e.g., almonds, walnuts, pecans)", "Wheat"];


class Allergy extends Component {
  constructor() {
    super();
    this.state = {selectedAllergies: []};
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    base.syncState(`users/${this.props.uid}/allergies`, {
      context: this,
      state: 'selectedAllergies',
      asArray: true
    })
  }
  handleChange() {
    let selectedAllergies = _.keysIn(_.pickBy(this.refs, 'checked'));
    this.setState({selectedAllergies});
  }
  render () {
    let checkBoxes = allergies.map((allergy, index) => (
      <label key={index}>
        <input type="checkbox"
          ref={allergy}
          onChange={this.handleChange}
          checked={this.state.selectedAllergies.includes(allergy)}/>
        {allergy}
      </label>
    ));
    return (
      <div>
        <h2>Allergies</h2>
          {checkBoxes}
      </div>
    )
  }
}

export default Allergy;
