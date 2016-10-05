import React, { Component } from 'react';
import base from '../config/ReBase';
import _ from 'lodash';

class AngleMade extends Component {
    constructor (props) {
      super(props);
      this.state = {venue: null}
      this.clearPartyFromUser = this.clearPartyFromUser.bind(this);
    }
    componentWillMount() {
      this.decideVenue(this.props);
    }
    componentWillReceiveProps(nextProps) {
      this.decideVenue(nextProps);
    }
    decideVenue(props) {
      let { partyId, allRestaurants } = props;
      partyId = partyId || localStorage.partyId;
      base.fetch(`parties/${partyId}/selections`, {
        context: this,
        asArray: true,
        then(choices) {
          let commonChoices = _.intersection(...choices);
          let combinedChoices = _.uniq(_.flatten(choices));
          let randomChoice = _.shuffle(commonChoices.length ? commonChoices : combinedChoices)[0];
          console.log("Combined choices are ", combinedChoices);
          console.log("Common choices are ", commonChoices);
          console.log("random choice is:", randomChoice);
          base.fetch(`parties/${partyId}/venue`, {
            context: this,
            then(venue) {
              if (venue) {
                this.setState({venue: allRestaurants.filter(restaurant => restaurant.id === venue)[0]});
              } else {
                base.post(`parties/${partyId}/venue`, {
                  data: randomChoice
                })
                this.setState({venue: allRestaurants.filter(restaurant => restaurant.id === randomChoice)[0]});
              }

            }
          })
        }
      })
    }
    clearPartyFromUser() {
      let uid = base.auth().currentUser.uid;
      base.update(`users/${uid}`, {
        data: {
          partyId: null
        }
      });
      this.context.router.push("choose-friends");
    }
    render () {

      return(
        <div className="angleMade">
          <img src={this.state.venue ? this.state.venue.image_url : ''} style={{width: "275px", height: "250px", marginTop: "20px"}} alt="..." className="img-thumbnail"/>
          <h1 style={{marginBottom: "0px", fontSize: "50px", color: "#6798cd", fontFamily: "fantasy"}}><a href={this.state.venue ? this.state.venue.url : ""}> {this.state.venue ? this.state.venue.name : ""}</a></h1>
            <h2 style={{textAlign: "inherit", margin: "0px", fontSize: "30px", color: "#6798cd",}}> {this.state.venue ? this.state.venue.location.address1 : ''}
                {this.state.venue ? `${this.state.venue.location.city}, ` : ''}
                {this.state.venue ? this.state.venue.location.state : ''}
                {this.state.venue ? this.state.venue.location.zip_code : ''}
            </h2>
            <p style={{textAlign: "inherit", margin: "0px", fontSize: "20px", color: "#6798cd",}}>{this.state.venue ? `Phone #: ${this.state.venue.phone.replace('+1', '')}` : ''}<br></br>
                {this.state.venue ? `Price: ${this.state.venue.price}`: ''}</p>


              <button style={{marginTop: "40px", width: "120px"}} className="btn btn-primary btn-sm" onClick={this.clearPartyFromUser}>Got It!</button>
        </div>

      )
    }
}

AngleMade.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default AngleMade;
