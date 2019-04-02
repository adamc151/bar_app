import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import List from "../components/List/List";
import Modal from "../components/Modal/Modal";
import MyMap from "../components/GoogleMapWithSearch/map";
import HorizontalSlider from "../components/Slider/Slider";
import "./MainContainer.css";
import FilterDropdown from "../components/FilterDropdown/FilterDropdown";
import MilesDropdown from "../components/MilesDropdown/MilesDropdown";
import Carousel from "../components/Carousel/Carousel";

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { setCurrentLocation, centerMap, fetchData } = this.props.actions;
    const {
      mapCentre,
      currentLocation,
      miles,
      timeFilter,
      hoverCoordinates
    } = this.props;
    const { lat, lng } = mapCentre;

    return (
      <div className="wrapper">
        <div className="mapContainer">
          <MyMap
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            centerOn={{ lat, lng, miles, timeFilter }}
            centerMap={centerMap}
            fetchData={fetchData}
            toggle={this.props.toggle}
            data={this.props.data}
            miles={miles}
            nowFilter={this.props.actions.nowFilter}
            setTimeFilter={this.props.actions.setTimeFilter}
            hoverCoordinates={hoverCoordinates}
          />
        </div>

        <div className="sideNav">
          <div className="sideNavHeader">
            <div className="timeFilter">
              <FilterDropdown centerOn={{ lat, lng, miles, timeFilter }} />
            </div>
            <div className="milesFilter">
              <MilesDropdown centerOn={{ lat, lng, miles, timeFilter }} />
            </div>
          </div>
          <div className="list">
            <List
              data={this.props.data}
              onClick={entry =>
                this.props.actions.centerMap(
                  entry.location.coordinates[0],
                  entry.location.coordinates[1]
                )
              }
              onHover={entry =>
                this.props.actions.setHoverCoordinates(
                  entry.location.coordinates[0],
                  entry.location.coordinates[1]
                )
              }
            />
          </div>
          <div className="carousel">
            <Carousel data={this.props.data} onSwipe={entry => {
              console.log('entry', entry);
              if(!entry) return;
              this.props.actions.centerMap(
                entry.location.coordinates[0],
                entry.location.coordinates[1]
              );
              this.props.actions.setHoverCoordinates(
                entry.location.coordinates[0],
                entry.location.coordinates[1]
              );
            }

            } />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    data: state.data,
    mapCentre: state.mapCentre,
    currentLocation: state.currentLocation,
    toggle: state.toggle,
    miles: state.miles,
    timeFilter: state.timeFilter,
    hoverCoordinates: state.hoverCoordinates
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
