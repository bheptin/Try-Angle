import React, { Component } from 'react';
import base from '../config/ReBase';
import _ from 'lodash';

class AngleMade extends Component {
    constructor (props) {
      super(props);
      this.state = {venue: null}
    }
    componentWillMount() {
      base.fetch(`parties/${this.props.partyId}/selections`, {
        context: this,
        asArray: true,
        then(choices) {
          let commonChoices = _.intersection(...choices);
          let combinedChoices = _.uniq(_.flatten(choices));
          let randomChoice = _.shuffle(commonChoices || combinedChoices)[0];
          console.log("Combined choices are ", combinedChoices);
          console.log("Common choices are ", commonChoices);
          base.fetch(`parties/${this.props.partyId}/venue`, {
            context: this,
            then(venue) {
              if (venue) {
                this.setState({venue: this.props.allRestaurants.filter(restaurant => restaurant.id === venue)[0]});
              } else {
                base.post(`parties/${this.props.partyId}/venue`, {
                  data: randomChoice
                })
                this.setState({venue: this.props.allRestaurants.filter(restaurant => restaurant.id === randomChoice)[0]});
              }
            }
          })
        }
      })
    }
    render () {
      return(
        <div className="angleMade">
          <h1>{this.state.venue ? this.state.venue.name : ""}</h1>
        </div>

      )
    }
}

export default AngleMade;
