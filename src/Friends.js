import React, { Component } from 'react';
import base from './config/ReBase';
import _ from 'lodash';


class Friends extends Component {
  constructor (props) {
    super(props)
      this.state = {
        data: [],
        selectedFriends: [],
        friendsList: []
      }
      this.addSelected = this.addSelected.bind(this);
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
      state: 'friendsList'
    })

    base.syncState(`users/${this.props.uid}/selectedFriends`, {
      context: this,
      asArray: true,
      state: 'selectedFriends'
    })
  }

  addSelected (users) {
    let selectedFriends = _.keysIn(_.pickBy(this.refs, 'checked'));
    this.setState({selectedFriends});


  }
  AddFriendToList (users) {
    console.log(users.key)
    if (this.state.friendsList.includes(users.key)){
      console.log(users.key)
    } else {
      this.setState({friendsList: [...this.state.friendsList, users.key]})
    }

  }


  render () {

    let fullNames = this.state.data.map((users, index) => <li key={index}> {users.personalInfo.firstName} {users.personalInfo.lastName} <button onClick={this.AddFriendToList.bind(this, users)}type="button" className="btn btn-primary btn-xs">Add</button> <input ref={users.key} onChange={this.addSelected} type="checkbox"/></li>);
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
