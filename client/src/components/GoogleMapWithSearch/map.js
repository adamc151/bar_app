import React, { Fragment } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Place from "../Place/Place";
import "./map.css";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const keys = require("../../keys");
const API_KEY = keys.googleAPIKey;

export class MyMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 51.5074,
      longitude: -0.12,
      zoom: 5,
      showingInfoWindow: false,
      currentZoom: 0,
      center: {
        lat: 51.5074,
        lng: -0.12
      }
    };

    this.getLocation = this.getLocation.bind(this);
    this.centerMap = this.centerMap.bind(this);
    this.setCurrentLocation = this.setCurrentLocation.bind(this);
    this.setDefaultLocation = this.setDefaultLocation.bind(this);
    this.findPlace = this.findPlace.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const latitudeOffset = window.matchMedia("(max-width: 1000px)").matches
      ? -50 * Math.pow(0.5, state.currentZoom)
      : 0;

    return {
      ...state,
      center: {
        lat: props.centerCoordinates[0] + latitudeOffset,
        lng: props.centerCoordinates[1]
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.currentZoom === this.state.currentZoom;
  }

  componentDidMount() {
    this.getLocation();
  }

  setDefaultLocation(errorObj) {
    this.centerMap({
      coords: {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }
    });
  }

  onMapClicked() {
    this.props.searchbarFocusOut();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.setCurrentLocation,
        this.setDefaultLocation,
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  setCurrentLocation(position) {
    this.setState({ searchedPlace: null, showingInfoWindow: false });
    // console.log("setCurrentLocation position", position);
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

      if (place.types && (place.types.includes("bar") || place.types.includes("restaurant") )) {
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
    const {
      hoverCoordinates,
      setCarouselSlide,
      centerCoordinates,
      userCoordinates,
      miles,
      timeFilter,
      searchbarFocusIn,
      searchbarFocusOut
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
          onfocusin={searchbarFocusIn}
          onfocusout={searchbarFocusOut}
        />
        <div className="map">
          {this.state.showingInfoWindow && (
            <Place
              onClick={() => this.setState({ showingInfoWindow: false })}
              place={this.state.searchedPlace}
              onAdd={() => {
                this.props.fetchData(obj);
              }}
            />
          )}

          <GoogleMapReact
            zoom={14}
            bootstrapURLKeys={{ key: API_KEY, libraries: "places" }}
            center={this.state.center}
            onReady={(a, map) => (this.map = map)}
            onClick={this.onMapClicked}
            options={{ disableDefaultUI: true }}
            onGoogleApiLoaded={x => (this.map = x.map)}
            onChange={x => {
              this.setState({ currentZoom: x.zoom, center: x.center });
            }}
          >
            <Marker
              className="currentLocation"
              lat={userCoordinates[0]}
              lng={userCoordinates[1]}
            />

            {this.props.data.map((marker, i) => {
              const { coordinates } = marker.location;
              const { deals } = marker;
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
                  category={deals[0].category}
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
