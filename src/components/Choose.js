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
    this.state = {value: []};
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
      <li className={restaurant.name.length > 30 ? "col-md-12 col-lg-6 col-xl-6" : "col-md-6 col-lg-4 col-xl-4"} style={{padding: "0", height: "190px"}}>
        <label className="RestaurantList col-sm-6 col-sm-offset" key={index}>
          <img src={restaurant.image_url} style={{width: "100px", height: "100px"}} alt="..." className="img-thumbnail"/>
          <div style={{margin: "0px"}}>
            <h3 style={{color: "#4579B4", fontFamily: "fantasy", fontSize: "30px", fontWeight: "bold"}}>{restaurant.name}</h3>
            <h4 style={{color: "#2A619E",float: "left"}}>{restaurant.location.address1}<br></br></h4>
          </div>
          <input style={{marginLeft: "10px",height: "15px", width: "15px"}}ref={restaurant.id} type="checkbox" aria-label="..."
            checked={this.state.value.filter(i => i.value === restaurant.id).length}
            onChange={this.handleCheck.bind(this, restaurant)}/><br></br>
        </label>
      </li>
    ));
    let options = allRestaurants.map(restaurant => {
      return {value: restaurant.id, label: restaurant.name}
    });
    if (allRestaurants.length) {
      return (
        <div>
          <h2 style={{fontSize: "50px", color: "#6798cd", fontFamily: "fantasy"}}>Where would you like to eat?</h2>
          <button style={{width: "100px", marginTop: "50px"}} onClick={this.handleClick} className="btn btn-primary">Next</button>
          <div className="container-fluid" style={{marginTop: "50px"}}>
            <MediaQuery query='(min-width: 901px)'>
              <ul className="row" style={{listStyleType: "none", padding: "0"}}>{checkboxes}</ul>
            </MediaQuery>
          </div>
          <MediaQuery query='(max-width: 900px)'>
            <div>
              <Select
                multi={true}
                value={this.state.value}
                placeholder="What do you want to eat?"
                options={options}
                onChange={this.handleSelect}/>
            </div>
          </MediaQuery>
        </div>
      )
    } else {
      return <h2 style={{fontSize: "50px", color: "#6798cd", fontFamily: "fantasy"}}>Where would you like to eat?</h2>
    }
  }
}

Choose.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Choose;
