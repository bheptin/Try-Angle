import React, { Component } from 'react';
import base from './config/ReBase';


class Friends extends Component {
  constructor (props) {
    super(props)
      this.state = {
        data: [],
        selectedFriend: []
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

  AddFriendToList (users) {
    console.log(users)
    base.push(`users/iFiH3VX6IRal2d7ukB6bAdyQUHp2/friendsList`, {
      data: users.personalInfo
    })
  }



  render () {

    let fullNames = this.state.data.map((user, index) => <li key={index}>{user.personalInfo.firstName} {user.personalInfo.lastName}
    <button onClick={this.AddFriendToList.bind(this, user)}type="button" className="btn btn-primary btn-xs">Add</button><input type="checkbox"/></li>);
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
