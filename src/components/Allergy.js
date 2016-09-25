import React, { Component } from 'react';
import _ from 'lodash';

const allergies = ["Crustacean shellfish (e.g., crab, lobster, shrimp)", "Eggs", "Fish (e.g., bass, flounder, cod)", "Milk", "Peanuts", "Soybeans", "Tree nuts (e.g., almonds, walnuts, pecans)", "Wheat"];


class Allergy extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    let selectedAllergies = _.keysIn(_.pickBy(this.refs, 'checked'));
    this.props.handleCheck(selectedAllergies);
  }
  render () {
    let checkBoxes = allergies.map((allergy, index) => (
      <label key={index}>
        <input type="checkbox" ref={allergy} onChange={this.handleChange}/>
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
