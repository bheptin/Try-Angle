import React, { Component, cloneElement } from 'react';
import { getRestaurants } from '../config/api';
import BasicInfo from '../components/BasicInfo';
import base from '../config/ReBase';

class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: []
    };
    // this.handleClick = this.handleClick.bind(this);
  }
  // handleClick() {
  //   // const routes = ["/profile/basic-info", "/profile/food-prefs", "/profile/allergies", "/choose-friends"];
  //   // let currentRoute = this.props.location.pathname;
  //   // let nextIndex = routes.indexOf(currentRoute) + 1;
  //   this.context.router.push("choose-friends");
  // }
  render() {
    return (
      <div>
        <h1>Profile</h1>
        {cloneElement(this.props.children, {
          uid: this.props.uid,
          allRestaurants: this.props.allRestaurants
        })}
      </div>
    )
  }
}

ProfileContainer.contextTypes = {router: React.PropTypes.object.isRequired};

export default ProfileContainer;
