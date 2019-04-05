import React, { Fragment } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Place from "../Place/Place";
import "./map.css";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const keys = require("../../keys");

const API_KEY = keys.googleAPIKey;

console.log(`ENV VARIABLES: ${JSON.stringify(process.env)}`);

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
  }

  componentDidMount() {
    this.getLocation();
  }

  errorHandler(errorObj) {
    alert(errorObj.code + ": " + errorObj.message);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.setCurrentLocation,
        this.errorHandler,
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  setCurrentLocation(position) {
    this.setState({ searchedPlace: null, showingInfoWindow: false });
    console.log("setCurrentLocation position", position);
    this.props.setUserCoordinates([
      position.coords.latitude,
      position.coords.longitude
    ]);
    this.centerMap(position);
  }

  centerMap(position, searchedPlace = false) {
    if (!searchedPlace) {
      this.setState({ searchedPlace: null });
    }

    this.props.setCenterCoordinates([
      position.coords.latitude,
      position.coords.longitude
    ]);
    const obj = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
      miles: this.props.miles,
      timeFilter: this.props.timeFilter
    };
    this.props.fetchData(obj);
  }

  findPlace(e) {
    var map = this.map;

    // Create the search box and link it to the UI element.
    var searchBox = new window.google.maps.places.SearchBox(e.target);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", function() {
      searchBox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.

    searchBox.addListener("places_changed", () => {
      var places = searchBox.getPlaces();
      console.log("places", places);

      if (places.length === 0) return;
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
      };

      const el = document.createElement("p");
      el.innerHTML = place.adr_address;
      let city = "";
      try {
        city = el.querySelector(".locality").innerText.trim();
      } catch (err) {}

      if (place.types && place.types.includes("bar")) {
        this.setState({
          showingInfoWindow: true,
          searchedPlace: {
            name: place.name,
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            place_id: place.place_id,
            photo: place.photos && place.photos[0].getUrl(),
            website: place.website && place.website,
            city: city
          }
        });
      }

      this.centerMap(position, true);
    });
  }

  render() {
    console.log("this.props", this.props);
    console.log("this.state", this.state);
    const {
      hoverCoordinates,
      setCarouselSlide,
      centerCoordinates,
      userCoordinates,
      miles,
      timeFilter
    } = this.props;

    const obj = {
      lat: centerCoordinates[0],
      long: centerCoordinates[1],
      miles,
      timeFilter
    };

    return (
      <Fragment>
        <SearchBar
          className="searchbar"
          getNode={node => (this.searchBox = node)}
          onChange={this.findPlace}
          onClickButton={this.getLocation}
        />
        <div className="map">
          {this.state.showingInfoWindow && (
            <Place
              onClick={() => this.setState({ showingInfoWindow: false })}
              place={this.state.searchedPlace}
              onAdd={() => {
                console.log("onAdddd");
                this.props.fetchData(obj);
              }}
            />
          )}

          <GoogleMapReact
            zoom={15}
            bootstrapURLKeys={{ key: API_KEY, libraries: "places" }}
            center={{ lat: centerCoordinates[0], lng: centerCoordinates[1] }}
            onReady={(a, map) => (this.map = map)}
            onClick={this.onMapClicked}
            options={{ disableDefaultUI: true }}
            onGoogleApiLoaded={x => (this.map = x.map)}
          >
            <Marker
              className="currentLocation"
              lat={userCoordinates[0]}
              lng={userCoordinates[1]}
            />

            {this.props.data.map((marker, i) => {
              const { coordinates } = marker.location;
              const animate =
                hoverCoordinates[0] === coordinates[0] &&
                hoverCoordinates[1] === coordinates[1];
              return (
                <Marker
                  className={animate ? "hovered" : "plainMarker"}
                  onClick={() => setCarouselSlide(i)}
                  key={i}
                  lat={coordinates[0]}
                  lng={coordinates[1]}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </Fragment>
    );
  }
}

export default MyMap;
