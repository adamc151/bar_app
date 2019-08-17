import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import List from "../components/List/List";
import MyMap from "../components/GoogleMapWithSearch/map";
import "./MainContainer.css";
import Carousel from "../components/Carousel/Carousel";
import LoadingPage from '../components/LoadingPage/LoadingPage';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCarousel: true,
      showLoader: false
    };
  }

  componentDidMount(){
    setTimeout(() => { this.setState({'showLoader': true}) }, 2000);
  }

  render() {
    const {
      setUserCoordinates,
      setCenterCoordinates,
      setHoverCoordinates,
      setCarouselSlide,
      fetchData,
      fetchOne,
      setLoading
    } = this.props.actions;
    const {
      centerCoordinates,
      userCoordinates,
      miles,
      timeFilter,
      hoverCoordinates,
      data,
      carouselSlide,
      loading
    } = this.props;

    const loadingModifier = loading ? 'loading' : '';

    return (
      <Fragment>
      {loading && this.state.showLoader && <LoadingPage />}
      <div className={"wrapper " + loadingModifier}>
        <div className="mapContainer">
          <MyMap
            userCoordinates={userCoordinates}
            setUserCoordinates={setUserCoordinates}
            centerCoordinates={centerCoordinates}
            setCenterCoordinates={setCenterCoordinates}
            fetchData={fetchData}
            fetchOne={fetchOne}
            data={data}
            hoverCoordinates={hoverCoordinates}
            setCarouselSlide={setCarouselSlide}
            searchbarFocusIn={() => {
              this.setState({ displayCarousel: false });
            }}
            searchbarFocusOut={() => {
              this.setState({ displayCarousel: true });
            }}
            onMapsLoaded={() => setLoading(false)}
            miles={miles}
            timeFilter={timeFilter}
          />
        </div>

        <div className="sideNav">
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

        {this.state.displayCarousel && (
          <div className="carousel">
            <Carousel
              data={data}
              controlledSlide={carouselSlide}
              onSwipe={entry => {
                if (!entry) return;
                setCenterCoordinates(entry.location.coordinates);
                setHoverCoordinates(entry.location.coordinates);
              }}
              onUpdate={entry => {
                if (!entry) return;
                setHoverCoordinates(entry.location.coordinates);
              }}
            />
          </div>
        )}
      </div>
      </Fragment>
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
