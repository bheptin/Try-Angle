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
  handleSelect(value) {
    console.log(value);
    this.setState({value});
  }
  render() {
    let { allRestaurants } = this.props;
    console.log(allRestaurants);
    let checkboxes = allRestaurants.map((restaurant, index) => (
      <label className="RestaurantList col-sm-6 col-sm-offset" key={index}>
      <img src={restaurant.image_url} style={{width: "100px", height: "100px"}} alt="..." className="img-thumbnail"/>
        <div style={{margin: "0px"}}>
          <p style={{height: "30px", margin: "0", color: "#4579B4", fontFamily: "fantasy", fontSize: "30px", fontWeight: "bold"}}>{restaurant.name}</p>
          <p style={{color: "#2A619E",float: "left"}}>{restaurant.location.address1}<br></br>
          {restaurant.location.city}
          {restaurant.location.state}
          {restaurant.location.zip_code}</p>
        </div>
        <input style={{marginLeft: "10px",height: "15px", width: "15px"}}ref={restaurant.id} type="checkbox" aria-label="..."
          checked={this.state.value.filter(i => i.value === restaurant.id).length}
          onChange={this.handleCheck.bind(this, restaurant)}/><br></br>

      </label>

    ));
    let options = allRestaurants.map(restaurant => {
      return {value: restaurant.id, label: restaurant.name}
    });
    return (
      <div className="Choices container-responsive">
        <MediaQuery query='(min-width: 701px)'>

          <h2 style={{fontSize: "50px", color: "#6798cd", fontFamily: "fantasy"}}>Where would you like to eat?</h2>
          {checkboxes}
        </MediaQuery>
        <MediaQuery query='(max-width: 700px)'>
          <div>
            <Select
              multi={true}
              value={this.state.value}
              placeholder="What do you want to eat?"
              options={options}
              onChange={this.handleSelect}/>
          </div>
        </MediaQuery>
        <button style={{width: "100px", marginTop: "50px"}} onClick={this.handleClick} className="btn btn-primary">Next</button>
      </div>
    )
  }
}

Choose.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Choose;
