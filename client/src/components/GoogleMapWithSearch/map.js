import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Place from "../Place/Place";
import "./map.css";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import navigate from "../../containers/icons/back.png";

const keys = require("../../keys");
const API_KEY = keys.googleAPIKey;

export class MyMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 53.8008,
      longitude: -1.5491,
      zoom: 5,
      showingInfoWindow: false,
      currentZoom: 14,
      center: {
        lat: 51.5074,
        lng: -0.12
      },
      loading: true,
      mapOffset: 15 * Math.pow(1.04, 14)
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
    let mapOffset = state.mapOffset;
    if(state.center.lat !== centerCoordinates[0] && state.center.lng !== centerCoordinates[1]){
      mapOffset = 15 * Math.pow(1.04, state.currentZoom);
    }

    return {
      ...state,
      previousCenter: state.center,
      center: {
        lat: centerCoordinates[0],
        lng: centerCoordinates[1]
      },
      mapOffset
    };
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.loading && !this.props.loading){
      const [ latitude, longitude ] = this.props.centerCoordinates;
      this.centerMap({ coords: { latitude, longitude } });
      this.getLocation(false);
    }
  }

  setDefaultLocation(errorObj, centerMap) {
    const { latitude, longitude } = this.state;
    this.setState({ fetchingUserLocation: false});
    centerMap && this.centerMap({ coords: { latitude, longitude } });
  }

  onMapClicked() {
    this.searchBox.blur();
  }

  getLocation(centerMap = true) {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.setCurrentLocation(position, centerMap),
        (errorObj) => this.setDefaultLocation(errorObj, centerMap),
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
      this.setState({ fetchingUserLocation: true});
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  setCurrentLocation(position, centerMap) {

    const { setUserCoordinates } = this.props;
    const { latitude, longitude } = position.coords;

    this.setState({ searchedPlace: null, showingInfoWindow: false, fetchingUserLocation: false });
    setUserCoordinates([ latitude, longitude ]);

    centerMap && this.centerMap({ coords: {
      longitude,
      latitude: latitude + (Math.random() / 1000)
    }});
  }

  centerMap(position, searchedPlace = false, doFetchData = true) {

    const { setCenterCoordinates, setHoverCoordinates, fetchData, timeFilter, miles } = this.props;
    const { latitude: lat, longitude: long } = position.coords;

    if (!searchedPlace) {
      this.setState({ searchedPlace: null });
    }

    setCenterCoordinates([ lat, long ]);
    setHoverCoordinates([ lat, long ]);

    doFetchData && fetchData({ lat, long, miles, timeFilter });
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

      console.log('place', place);
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

      const exists = this.props.data.some(function(item) {
        return item.place_id === place.place_id;
      });

      if(exists){
        this.props.setCarouselSlide(0);
        this.centerMap(position, true);
        return;
      }
      else if(place.types && (place.types.includes("bar") || place.types.includes("restaurant") )){
        const answer = window.confirm('This is a new location, would you like to submit a hapihour for this location?');
        if(!answer){
          return;
        }
      }

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
        this.props.displayCarousel(false);
      }

      this.centerMap(position, true);
    });
  }

  render() {

    const { fetchingUserLocation } = this.state;

    const {
      hoverCoordinates,
      setCarouselSlide,
      centerCoordinates,
      userCoordinates,
      miles,
      timeFilter,
      jwt,
      displayCarousel,
      displaySearchBar
    } = this.props;

    const obj = {
      lat: centerCoordinates[0],
      long: centerCoordinates[1],
      miles,
      timeFilter,
      jwt
    };

    const mapStyle = window.matchMedia("(max-width: 1000px)").matches ?
    { height: `calc(100% + ${this.state.mapOffset}%`  } : { height: `100%`  };


    return (
      <Route render={({ history }) => (
        <Fragment >
          <SearchBar
            className={displaySearchBar ? '' : 'removeSearchBar'}
            getNode={node => (this.searchBox = node)}
            onChange={this.findPlace}
            onClickButton={() => { this.getLocation(); displayCarousel(false); }}
            onfocusin={() => displayCarousel(false)}
            onfocusout={() =>
              setTimeout(
                () => {
                  //add slight delay for android so carousel doesnt flash
                  displayCarousel(true);
                }, 100)}
            fetchingUserLocation={fetchingUserLocation}
          />

          <div className="mapNav">
            <img src={navigate} className="bottomTextbackNavigation" alt="back" onClick={() => { history.push(`/`); }}/>
          </div>

          <div className="map" style={mapStyle}>
            {this.state.showingInfoWindow && (
              <Place
                onClick={() => {
                  this.setState({ showingInfoWindow: false });
                  displayCarousel(true);
                }}
                place={this.state.searchedPlace}
                onAdd={() => { this.props.fetchData(obj); }}
              />
            )}

            <GoogleMapReact
              zoom={15}
              bootstrapURLKeys={{ key: API_KEY, libraries: "places" }}
              center={this.state.center}
              onReady={(a, map) => (this.map = map)}
              onClick={this.onMapClicked}
              options={{ disableDefaultUI: true , gestureHandling: 'greedy', clickableIcons: false }}
              onGoogleApiLoaded={x => {
                this.map = x.map;
                this.props.onMapsLoaded();
                window.places = new window.google.maps.places.PlacesService(x.map);
              }}
              onChange={x => { this.setState({ currentZoom: x.zoom }); }} >
              <Marker className="currentLocation" lat={userCoordinates[0]} lng={userCoordinates[1]} />

              {this.props.data.map((marker, i) => {
                const { coordinates } = marker.location;
                const { deals } = marker;
                const animate =
                  hoverCoordinates[0] === coordinates[0] &&
                  hoverCoordinates[1] === coordinates[1];
                return (
                  <Marker
                    className={animate ? "hovered" : "plainMarker"}
                    onClick={() => {
                      const position = {
                        coords: {
                          latitude: coordinates[0],
                          longitude: coordinates[1]
                        }
                      }
                      this.centerMap(position, false, false);
                      setCarouselSlide(i)
                    }}
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
      )} />
    );
  }
}

export default MyMap;
