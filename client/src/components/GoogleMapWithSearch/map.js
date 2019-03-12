import React, {Fragment} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import SearchBar from '../SearchBar/SearchBar';
import Place from '../Place/Place';
import './map.css';
import currentLocation from './icons/currentLocation.png';

const keys = require('../../keys');


const API_KEY = keys.googleAPIKey;

export class MyMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: 55,
      longitude: -5,
      zoom: 5,
      showingInfoWindow: false
    };

    this.getLocation = this.getLocation.bind(this);
    this.centerMap = this.centerMap.bind(this);
    this.setCurrentLocation = this.setCurrentLocation.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.findPlace = this.findPlace.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  componentDidMount(){
    this.getLocation();
  }

  errorHandler(errorObj){
    alert(errorObj.code + ": " + errorObj.message);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCurrentLocation, this.errorHandler, {enableHighAccuracy: true, maximumAge: 10000});
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  setCurrentLocation(position) {
    this.setState({ searchedPlace: null, showingInfoWindow: false })
    console.log('setCurrentLocation position', position);
    this.props.setCurrentLocation(position.coords.latitude, position.coords.longitude);
    this.centerMap(position);
  }

  centerMap(position, searchedPlace = false) {

    if(!searchedPlace){
      this.setState({ searchedPlace: null })
    }

    this.props.centerMap(position.coords.latitude, position.coords.longitude);
    const obj = {lat: position.coords.latitude, long: position.coords.longitude, miles: this.props.centerOn.miles, timeFilter: this.props.centerOn.timeFilter}
    this.props.fetchData(obj);
  }

  findPlace(e) {
      const { google } = this.props;
      console.log('this.map', this.map);
      var map = this.map;

      // Create the search box and link it to the UI element.
      var searchBox = new google.maps.places.SearchBox(e.target);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });

      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.

      searchBox.addListener('places_changed', () => {
        console.log('before PlacesService');
        var places = searchBox.getPlaces();
        console.log('places', places);

        if (places.length === 0) {
          return;
        }

        const place = places[0];

        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        var position = {
          coords: {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          }
        }

        this.setState({
          showingInfoWindow: true,
          searchedPlace: {
            name: place.name,
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            place_id: place.place_id,
            photo: place.photos[0].getUrl()
          }
        })

        this.centerMap(position, true);

        // Clear out the old markers.
        // markers.forEach(function(marker) {
        //   marker.setMap(null);
        // });
        // markers = [];
        //
        // // For each place, get the icon, name and location.
        // var bounds = new google.maps.LatLngBounds();
        // places.forEach(function(place) {
        //   if (!place.geometry) {
        //     console.log("Returned place contains no geometry");
        //     return;
        //   }
        //   var icon = {
        //     url: place.icon,
        //     size: new google.maps.Size(71, 71),
        //     origin: new google.maps.Point(0, 0),
        //     anchor: new google.maps.Point(17, 34),
        //     scaledSize: new google.maps.Size(25, 25)
        //   };
        //
        //   // Create a marker for each place.
        //   markers.push(new google.maps.Marker({
        //     map: map,
        //     icon: icon,
        //     title: place.name,
        //     position: place.geometry.location
        //   }));
        //
        //   if (place.geometry.viewport) {
        //     // Only geocodes have viewport.
        //     bounds.union(place.geometry.viewport);
        //   } else {
        //     bounds.extend(place.geometry.location);
        //   }
        // });
        //
        // map.fitBounds(bounds);
      });
  }


  onMarkerClick(props, marker, e){
    console.log('marker', marker);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props){
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };


  render() {
    console.log('this.props', this.props);
    console.log('this.state.showingInfoWindow', this.state.showingInfoWindow);
    const obj = {lat: this.props.centerOn.lat, long: this.props.centerOn.lng, miles: this.props.centerOn.miles, timeFilter: this.props.centerOn.timeFilter}
    const { google } = this.props;

    return (
      <Fragment>
          <SearchBar className='searchbar' getNode={node => this.searchBox = node} onChange={this.findPlace} onClickButton={this.getLocation} />
          <div className='map'>

          { this.state.showingInfoWindow && <Place onClick={() => this.setState({showingInfoWindow: false})} place={this.state.searchedPlace} onAdd={() => this.props.fetchData(obj)} />}

          <Map
            google={this.props.google} zoom={14}
            center={{ lat: this.props.centerOn.lat, lng: this.props.centerOn.lng }}
            onReady={(a, map) => this.map = map}
            onClick={this.onMapClicked}
            disableDefaultUI={true}
          >

          <Marker
            position={{ lat: this.props.currentLocation.lat, lng: this.props.currentLocation.lng }}
            icon={{ url: currentLocation, anchor: google.maps.Point(32,32), scaledSize: google.maps.Size(64,64) }}
          />

          { this.state.searchedPlace &&
            <Marker position={{ lat: this.state.searchedPlace.lat, lng: this.state.searchedPlace.lng }} ref = { node => this.searchedPlaceMarker = node } />
          }

          {this.props.data.map((marker, i) => {
            return <Marker key={i} position={{lat: marker.location.coordinates[0], lng: marker.location.coordinates[1] }} />
          })}

          </Map>

          </div>
      </Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MyMap)
