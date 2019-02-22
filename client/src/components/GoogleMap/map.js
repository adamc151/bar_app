import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Listing } from 'google-maps-react';

const API_KEY = 'AIzaSyDbgEJYukI5kbd_EijpPud_0EJna-YKa44';

export class MyMap extends React.Component {

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
    this.fetchPlaces = this.fetchPlaces.bind(this);

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

  fetchPlaces(mapProps, map) {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
    console.log('service', service);
  }


  render() {
    return (
      <Map google={this.props.google} zoom={14}
      center={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }}
          onReady={this.fetchPlaces}
      >


        <Marker onClick={this.onMarkerClick}
                name={'Current location'}
                title={'You are here'}
                name={'SOMA'}
                position={{lat: this.state.latitude,
                lng: this.state.longitude}}
                 >

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>HELLOOOO</h1>
            </div>
        </InfoWindow>

        </Marker>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MyMap)
