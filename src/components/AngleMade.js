import React, { Component } from 'react';
import _ from 'lodash';

class AngleMade extends Component {
    constructor (props) {
      super(props);
      this.state = {button: false, lucky: false}
    }

    eventHandler (Kevin) {
        console.log(Kevin);
        if (Kevin === "finalDecision") {
          this.setState({lucky: false})
        } else {
          this.setState({lucky: true})
        }
    }

    render () {
      let finalDecision = _.shuffle(this.props.chosenRestaurants)[0];
      let lucky = _.valuesIn(this.props.friendsChoices);
      lucky = _.flatten(lucky);
      console.log(lucky);
      lucky = _.shuffle(lucky)[0];

      return(
        <div className="angleMade">
          <button ref="angle" onClick={this.eventHandler.bind(this,"finalDecision")} type="button" className="btn btn-primary">Create Angle</button>
          <button ref="lucky" onClick={this.eventHandler.bind(this,"lucky")} type="button" className="btn btn-info">Feeling Lucky</button>
            <h2>Angle Made</h2>
            <h2>{!this.state.lucky ? finalDecision : lucky }
                </h2>
        </div>

      )
    }
}

export default AngleMade;
