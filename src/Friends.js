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
    let fullNames = this.state.data.map((user, index) => <li key={index}>{user.personalInfo.firstName} {user.personalInfo.lastName} <input type="checkbox"/></li>);
    return(
      <div className="Friends">
          <h3>Friends List</h3>
         <ul style={{listStyleType: "none"}}>{fullNames}

        </ul>

      </div>
    )
  }

}
export default Friends;
