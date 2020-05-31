import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.findPlace = this.findPlace.bind(this);
  }

  findPlace(e, map) {
    // Create the search box and link it to the UI element.
    var searchBox = new window.google.maps.places.SearchBox(e.target);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", function () {
      searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener("places_changed", () => {
      var places = searchBox.getPlaces();

      if (places.length === 0) return;
      const place = places[0];

      console.log("place", place);

      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      const addressArray = place.formatted_address.split(",");

      if (addressArray[addressArray.length - 1].trim() != "UK") {
        window.alert("Only UK based searches are enabled for now :)");
        return;
      }

      var position = {
        coords: {
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        },
      };

      const exists = this.props.data.some(function (item) {
        return item.place_id === place.place_id;
      });

      if (exists) {
        this.props.setCarouselSlide(0);
        this.props.centerMap(position, true);
        return;
      } else if (
        place.types &&
        (place.types.includes("bar") || place.types.includes("restaurant"))
      ) {
        const answer = window.confirm(
          "This is a new location, would you like to submit a hapihour for this location?"
        );
        if (!answer) {
          return;
        }
      }

      const el = document.createElement("p");
      el.innerHTML = place.adr_address;
      let city = "";
      try {
        city = el.querySelector(".locality").innerText.trim();
      } catch (err) {}

      if (
        place.types &&
        (place.types.includes("bar") || place.types.includes("restaurant"))
      ) {
        this.props.setSearchedPlace({
          showingInfoWindow: true,
          searchedPlace: {
            name: place.name,
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            place_id: place.place_id,
            photo: place.photos && place.photos[0].getUrl(),
            website: place.website && place.website,
            city: city,
          },
        });
        // this.props.history.push(`/add/${place.place_id}`);
        this.props.displayCarousel(false);
      }

      this.props.centerMap(position, true);
    });
  }

  render() {
    const {
      getNode,
      onClickButton,
      fetchingUserLocation,
      className,
      displayCarousel,
    } = this.props;

    const searchbarButtonModifier = fetchingUserLocation
      ? "searchbarButtonLoading"
      : "";

    return (
      <div className={className + " searchBarWrapper"}>
        <input
          ref={(node) => {
            this.searchBar = node;
            getNode(node);
          }}
          className="searchbar searchBarLanding"
          onChange={(e) => this.findPlace(e, this.props.map)}
          placeholder="Search..."
          onFocus={() => displayCarousel(false)}
          onBlur={() =>
            setTimeout(() => {
              //add slight delay for android so carousel doesnt flash
              displayCarousel(true);
            }, 100)
          }
          id="keyword"
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              this.searchBar.blur();
              return false;
            }
          }}
        />
        <div
          className={"searchbarButton " + searchbarButtonModifier}
          onClick={onClickButton}
        />
        <span className="line" />
      </div>
    );
  }
}

export default SearchBar;
