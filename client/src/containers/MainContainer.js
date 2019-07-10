import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import List from "../components/List/List";
import MyMap from "../components/GoogleMapWithSearch/map";
import "./MainContainer.css";
// import FilterDropdown from "../components/FilterDropdown/FilterDropdown";
// import MilesDropdown from "../components/MilesDropdown/MilesDropdown";
import Carousel from "../components/Carousel/Carousel";

class MainContainer extends Component {
  render() {
    const {
      setUserCoordinates,
      setCenterCoordinates,
      setHoverCoordinates,
      setCarouselSlide,
      fetchData
    } = this.props.actions;
    const {
      centerCoordinates,
      userCoordinates,
      miles,
      timeFilter,
      hoverCoordinates,
      data,
      carouselSlide
    } = this.props;

    return (
      <div className="wrapper">
        <div className="mapContainer">
          <MyMap
            userCoordinates={userCoordinates}
            setUserCoordinates={setUserCoordinates}
            centerCoordinates={centerCoordinates}
            miles={miles}
            timeFilter={timeFilter}
            setCenterCoordinates={setCenterCoordinates}
            fetchData={fetchData}
            data={data}
            miles={miles}
            hoverCoordinates={hoverCoordinates}
            setCarouselSlide={setCarouselSlide}
          />
        </div>

        <div className="sideNav">
          <div className="sideNavHeader">
            {/* <div className="timeFilter">
              <FilterDropdown
                centerCoordinates={centerCoordinates}
                miles={miles}
              />
            </div>
            <div className="milesFilter">
              <MilesDropdown
                centerCoordinates={centerCoordinates}
                timeFilter={timeFilter}
              />
            </div> */}
          </div>
          <div className="list">
            <List
              data={data}
              onClick={entry =>
                setCenterCoordinates(entry.location.coordinates)
              }
              onHover={entry => setHoverCoordinates(entry.location.coordinates)}
            />
          </div>
        </div>

        <div className="carousel">
          <Carousel
            data={data}
            controlledSlide={carouselSlide}
            onSwipe={entry => {
              if (!entry) return;
              setCenterCoordinates(entry.location.coordinates);
              setHoverCoordinates(entry.location.coordinates);
            }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    data: state.data,
    centerCoordinates: state.centerCoordinates,
    userCoordinates: state.userCoordinates,
    miles: state.miles,
    timeFilter: state.timeFilter,
    hoverCoordinates: state.hoverCoordinates,
    carouselSlide: state.carouselSlide
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
