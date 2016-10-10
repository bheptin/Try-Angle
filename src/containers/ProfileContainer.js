import React, { Component, cloneElement } from 'react';

class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: []
    };
  }
  componentWillMount() {
    this.props.showNav();
  }
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
