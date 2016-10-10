import React, { Component } from 'react';
import GoogleMap from 'google-map-react';


class SimpleMapPage extends Component {



  render() {
console.log(this.props.lat);
console.log(this.props.lng);
    return (
      <div className="MapPage">
         <GoogleMap bootstrapURLKeys={{key: 'AIzaSyBL8UkkbIv6jv4eoA3Ci2xFISW2fsdMNRw'}}
         style={{marginTop: "30px", display: "flex", marginLeft: "320px", position: "relative", width: "600px", height: "600px"}}
         defaultZoom={14}
         defaultCenter={{ lat: 28.5383360 , lng: -81.3792360 }}
         >
         

        </GoogleMap>
      </div>
    );
  }
}
export default SimpleMapPage;
