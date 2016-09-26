import React, { Component } from 'react';
import _ from 'lodash';

class AngleMade extends Component {
    constructor (props) {
      super(props);
      this.state = {AngleMade: []};
    }
    componentDidMount() {
      let finalDecision = _.shuffle([this.props.chosenRestaurants]);
          console.log(this.state);
        this.setState({AngleMade: finalDecision})
      }
    render () {
      return(
        <div className="angleMade">

        </div>

      )
    }
}

export default AngleMade;
