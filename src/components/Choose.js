import React, { Component } from 'react';
import _ from 'lodash';
import base from '../config/ReBase';

class Choose extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    let selectedRestaurants = _.keysIn(_.pickBy(this.refs, 'checked'));
    base.post(`parties/${this.props.partyId}/selections/${base.auth().currentUser.uid}`, {
      data: selectedRestaurants
    });
    base.post(`parties/${this.props.partyId}/readyToGo/${base.auth().currentUser.uid}`, {
      data: true
    });
    this.context.router.push("waiting-room");
  }
  render() {
    let { allRestaurants } = this.props;
    let checkboxes = allRestaurants.map((restaurant, index) => (
      <label key={index}>
        <input ref={restaurant.id} type="checkbox" aria-label="..."/>
        {restaurant.name}
        <img src={restaurant.image_url} style={{width: "40px", height: "40px"}} alt="..." className="img-thumbnail"/>
      </label>
    ));
    return (
      <div style={{border: "3px solid green"}}>
        <div className="my-choices">
          <h2>What do you want to eat?</h2>
          {checkboxes}
        </div>
        <button onClick={this.handleClick}>Next</button>
      </div>
    )
  }
}

Choose.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Choose;
