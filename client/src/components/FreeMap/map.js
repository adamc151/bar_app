import React from 'react';
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker/react'
import CustomMarker from './mapMarker'
import Overlay from 'pigeon-overlay'

class MyMap extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      latitude: 55,
      longitude: -5,
      zoom: 5,
      isCurrentLocation: false
    };

    this.getLocation = this.getLocation.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.errorHandler = this.errorHandler.bind(this);

  }

  static getDerivedStateFromProps(props, state) {
    if (props.centerOn) {
      return {
        latitude: props.centerOn.lat,
        longitude: props.centerOn.long,
        isCurrentLocation: false
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  componentDidMount(){
    this.getLocation();
  }

  errorHandler(errorObj){
    alert(errorObj.code + ": " + errorObj.message);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLocation, this.errorHandler, {enableHighAccuracy: true, maximumAge: 10000});
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


  setLocation(position) {
    this.setState({ isCurrentLocation: true, latitude: position.coords.latitude, longitude: position.coords.longitude, zoom: 15 });
  }

  render(){
    console.log('this.state', this.state);
    return (
        <Map center={[this.state.latitude, this.state.longitude]} zoom={this.state.zoom} >
          { this.state.isCurrentLocation && <Marker anchor={[this.state.latitude, this.state.longitude]} payload={1} onClick={({ event, anchor, payload }) => {}} /> }
          {this.props.coordinates.map(coordinate => {
              return <Marker anchor={[coordinate.lat, coordinate.long]} payload={1} onClick={({ event, anchor, payload }) => {}} />
          })}
        </Map>
    )
  }

}



export default MyMap;
