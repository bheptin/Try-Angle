import React, { Component } from 'react';
import Select from 'react-select';
import MediaQuery from 'react-responsive';
import 'react-select/dist/react-select.css';
import { getRestaurants } from '../config/api';
import _ from 'lodash';
import base from '../config/ReBase';

class Choose extends Component {
  constructor() {
    super();
    this.state = {restaurants: [], value: []};
    this.handleClick = this.handleClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillMount() {
    this.setState({restaurants: this.props.allRestaurants});
  }
  handleClick() {
    let selectedRestaurants = this.state.value.map(restaurant => restaurant.value);
    base.post(`parties/${this.props.partyId}/selections/${base.auth().currentUser.uid}`, {
      data: selectedRestaurants
    });
    base.post(`parties/${this.props.partyId}/readyToGo/${base.auth().currentUser.uid}`, {
      data: true
    });
    this.context.router.push("waiting-room");
  }
  handleCheck(restaurant, event) {
    if (event.target.checked) {
      this.setState({value: [...this.state.value, {value: restaurant.id, label: restaurant.name}]});
    } else {
      let value = this.state.value.filter(chosenRestaurant => chosenRestaurant.value !== restaurant.id);
      this.setState({value});
    }
  }
  updateRestaurants(searchTerm) {
    getRestaurants(searchTerm).then(restaurants => this.setState({restaurants}));
  }
  handleSelect(value) {
    console.log(value);
    this.setState({value});
  }
  render() {
    let { allRestaurants } = this.props;
    console.log(this.state.restaurants);
    let checkboxes = this.state.restaurants.map((restaurant, index) => (
      <label key={index}>
        <input ref={restaurant.id} type="checkbox" aria-label="..."
          checked={this.state.value.filter(i => i.value === restaurant.id).length}
          onChange={this.handleCheck.bind(this, restaurant)}/>
        {restaurant.name}
        <img src={restaurant.image_url} style={{width: "40px", height: "40px"}} alt="..." className="img-thumbnail"/>
      </label>
    ));
    let options = this.state.restaurants.map(restaurant => {
      return {value: restaurant.id, label: restaurant.name}
    });
    return (
      <div className="Choices">
        <MediaQuery query='(min-width: 701px)'>
          <h2>What do you want to eat?</h2>
          {checkboxes}
        </MediaQuery>
        <MediaQuery query='(max-width: 700px)'>
          <Select
            multi={true}
            value={this.state.value}
            placeholder="What do you want to eat?"
            options={options}
            onChange={this.handleSelect}/>
        </MediaQuery>
        <button onClick={this.handleClick}>Next</button>
      </div>
    )
  }
}

Choose.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Choose;
