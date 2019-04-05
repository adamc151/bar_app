import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import List from "../components/List/List";
import MyMap from "../components/GoogleMapWithSearch/map";
import "./MainContainer.css";
import FilterDropdown from "../components/FilterDropdown/FilterDropdown";
import MilesDropdown from "../components/MilesDropdown/MilesDropdown";
import Carousel from "../components/Carousel/Carousel";

class MainContainer extends Component {
  render() {
    const {
      setCurrentLocation,
      setCenterCoordinates,
      fetchData
    } = this.props.actions;
    const {
      centerCoordinates,
      currentLocation,
      miles,
      timeFilter,
      hoverCoordinates
    } = this.props;

    return (
      <div className="wrapper">
        <div className="mapContainer">
          <MyMap
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            centerCoordinates={centerCoordinates}
            miles={miles}
            timeFilter={timeFilter}
            setCenterCoordinates={setCenterCoordinates}
            fetchData={fetchData}
            toggle={this.props.toggle}
            data={this.props.data}
            miles={miles}
            nowFilter={this.props.actions.nowFilter}
            setTimeFilter={this.props.actions.setTimeFilter}
            hoverCoordinates={hoverCoordinates}
            setCarouselSlide={this.props.actions.setCarouselSlide}
          />
        </div>

        <div className="sideNav">
          <div className="sideNavHeader">
            <div className="timeFilter">
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
            </div>
          </div>
          <div className="list">
            <List
              data={this.props.data}
              onClick={entry =>
                setCenterCoordinates(entry.location.coordinates)
              }
              onHover={entry =>
                this.props.actions.setHoverCoordinates(
                  entry.location.coordinates[0],
                  entry.location.coordinates[1]
                )
              }
            />
          </div>
        </div>

        <div className="carousel">
          <Carousel
            data={this.props.data}
            controlledSlide={this.props.carouselSlide}
            onSwipe={entry => {
              if (!entry) return;
              setCenterCoordinates(entry.location.coordinates);
              this.props.actions.setHoverCoordinates(
                entry.location.coordinates[0],
                entry.location.coordinates[1]
              );
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
    currentLocation: state.currentLocation,
    toggle: state.toggle,
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
