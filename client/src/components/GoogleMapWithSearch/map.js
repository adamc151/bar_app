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
      currentZoom: 14,
      center: {
        lat: 51.5074,
        lng: -0.12
      },
      loading: true
    };

    this.getLocation = this.getLocation.bind(this);
    this.centerMap = this.centerMap.bind(this);
    this.setCurrentLocation = this.setCurrentLocation.bind(this);
    this.setDefaultLocation = this.setDefaultLocation.bind(this);
    this.findPlace = this.findPlace.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  static getDerivedStateFromProps(props, state) {

    const { centerCoordinates } = props;
    const { currentZoom } = state;

    const latitudeOffset = window.matchMedia("(max-width: 1000px)").matches
      ? -50 * Math.pow(0.5, currentZoom)
      : 0;

    return {
      ...state,
      center: {
        lat: centerCoordinates[0] && centerCoordinates[0] + latitudeOffset,
        lng: centerCoordinates[1]
      }
    };

  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.currentZoom === this.state.currentZoom;
  }

  componentDidMount() {
    if(this.props.centerCoordinates[0] === null){
      this.getLocation();
    }
  }

  setDefaultLocation(errorObj) {
    const { latitude, longitude } = this.state;
    this.setState({ fetchingUserLocation: false});
    this.centerMap({ coords: { latitude, longitude } });
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
      this.setState({ fetchingUserLocation: true});
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  setCurrentLocation(position) {

    const { setUserCoordinates } = this.props;
    const { latitude, longitude } = position.coords;

    this.setState({ searchedPlace: null, showingInfoWindow: false, fetchingUserLocation: false });
    setUserCoordinates([ latitude, longitude ]);

    this.centerMap({ coords: {
      longitude,
      latitude: latitude + (Math.random() / 1000)
    }});
  }

  centerMap(position, searchedPlace = false) {

    const { setCenterCoordinates, fetchData, timeFilter, miles } = this.props;
    const { latitude: lat, longitude: long } = position.coords;

    if (!searchedPlace) {
      this.setState({ searchedPlace: null });
    }

    setCenterCoordinates([ lat, long ]);
    fetchData({ lat, long, miles, timeFilter });
  }

  findPlace(e) {
    var map = this.map;

    // Create the search box and link it to the UI element.
    var searchBox = new window.google.maps.places.SearchBox(e.target);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", function() {
      searchBox.setBounds(map.getBounds());
    });

    // window.google.maps.event.addListenerOnce(map, 'idle', function(){
    //   console.log('rendered yo');
    // });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.

    searchBox.addListener("places_changed", () => {
      var places = searchBox.getPlaces();

      if (places.length === 0) return;
      const place = places[0];

      // let alreadyInDB = false;

      // this.props.fetchOne(place.place_id).then(function (response) {

      //   alreadyInDB = response.data != null;
      //   console.log(`alreadyInDB: ${alreadyInDB}`);

      //   if(alreadyInDB){
      //     alert("place already exists");
      //   }

      // });

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
      fetchingUserLocation
    } = this.state;

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
      <Fragment >
        <SearchBar
          className={"searchbar"}
          getNode={node => (this.searchBox = node)}
          onChange={this.findPlace}
          onClickButton={this.getLocation}
          onfocusin={searchbarFocusIn}
          onfocusout={searchbarFocusOut}
          fetchingUserLocation={fetchingUserLocation}
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
            gestureHandling="greedy"
            bootstrapURLKeys={{ key: API_KEY, libraries: "places" }}
            center={this.state.center}
            onReady={(a, map) => (this.map = map)}
            onClick={this.onMapClicked}
            options={{ disableDefaultUI: true }}
            onGoogleApiLoaded={x => {
              this.map = x.map;
              this.props.onMapsLoaded();
            }}
            onChange={x => this.setState({ currentZoom: x.zoom })}
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
