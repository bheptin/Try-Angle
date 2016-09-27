import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div>
          <h2>Allergies</h2>
            {checkBoxes}
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}

export default Allergy;
