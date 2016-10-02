import React, { Component } from 'react';
import base from '../config/ReBase';

class Decision extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }
    componentDidMount() {
      base.fetch('users',{
        context: this,
        asArray: true,
        then(data){
          console.log(data)
          this.setState(data)
        }
      })
    }


  render () {
    let peeps = this.state.data.map((user, index) => (
      <li key={index}> {user.personalInfo.firstName} {user.personalInfo.lastName}
      </li>
    ));
    return(
      <ul>{peeps}</ul>
    )
  }
}


export default Decision;
