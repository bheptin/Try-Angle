import React, { Component } from 'react';
import GoogleMap from 'google-map-react';


class SimpleMapPage extends Component {



  render() {

console.log(this.props.lat);
console.log(this.props.lng);
console.log(this.props.name);
    return (
      <div className="MapPage">
         <GoogleMap bootstrapURLKeys={{key: 'AIzaSyBL8UkkbIv6jv4eoA3Ci2xFISW2fsdMNRw'}}
         style={{marginTop: "30px", display: "inline-block", position: "relative", width: "600px", height: "400px"}}
         defaultZoom={18}
         defaultCenter={{lat: 28.5383360, lng: -81.3792360}}
         center={{lat: this.props.lat, lng: this.props.lng}}
         marker={{name: this.props.name}}
         >


        </GoogleMap>
      </div>
    );
  }
}
export default SimpleMapPage;
