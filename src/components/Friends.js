import React, { Component } from 'react';
import base from '../config/ReBase';
import _ from 'lodash';


class Friends extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      friendsList: []
    }
    this.addSelected = this.addSelected.bind(this);
  }
  componentDidMount(){
    base.fetch(`users`, {
      context: this,
      asArray: true,
      then(users) {
        this.setState({users})
      }
    })
    base.syncState(`user/${this.props.uid}/friendsList`, {
      context: this,
      asArray: true,
      state: 'friendsList'
    })
  }
  addSelected() {
    let selectedFriends = _.keysIn(_.pickBy(this.refs, 'checked'));
    this.props.handleCheck(selectedFriends);
  }
  AddFriendToList (user) {
    if ( !( this.state.friendsList.includes(user.key) ) ){
      this.setState({friendsList: [...this.state.friendsList, user.key]})
    }
  }
  render () {
    let friendsList = this.state.users.filter(user => user.key !== this.props.uid).map((user, index) => (
      <li key={index}> {user.personalInfo.firstName} {user.personalInfo.lastName}
        <button onClick={this.AddFriendToList.bind(this, user)}type="button" className="btn btn-primary btn-xs">Add</button>
        <input ref={user.key} onChange={this.addSelected} type="checkbox"/>
      </li>
    ));
    return(
      <div className="Friends">
        <h3>Friends List</h3>
        <ul style={{listStyleType: "none"}}>
          {friendsList}
        </ul>
      </div>
    )
  }

}


export default Friends;
