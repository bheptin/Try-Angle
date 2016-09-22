import React, { Component } from 'react';
import base from './config/ReBase';

class Friends extends Component {
  constructor (props) {
    super(props)
      this.state = {
        data: []
      }

  }
  componentDidMount(){
    base.fetch(`users`, {
      context: this,
      asArray: true,
      then(data) {
        this.setState({data})
        console.log(data);
      }
    })
  }

  render () {
    let fullNames = this.state.data.map((user, index) => <li key={index}>{user.personalInfo.firstName} {user.personalInfo.lastName}</li>);
    return(
      <div className="friendsList">
        <ul style={{listStyleType: "none"}}>{fullNames}

        </ul>

      </div>
    )
  }

}
export default Friends;
