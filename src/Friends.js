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
    base.syncState(`users/${this.props.uid}/friendsList`, {
      context: this,
      asArray: true,
      state: 'selectedFriend'
    })
  }

  AddFriendToList (users) {
    console.log(users.key)
    if (this.state.selectedFriend.includes(users.key)){
      console.log(users.key)
    } else {
      this.setState({selectedFriend: [...this.state.selectedFriend, users.key]})
    }

  }


  render () {

    let fullNames = this.state.data.map((users, index) => <li key={index}> {users.personalInfo.firstName} {users.personalInfo.lastName} <button onClick={this.AddFriendToList.bind(this, users)}type="button" className="btn btn-primary btn-xs">Add</button> <input type="checkbox"/></li>);
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
