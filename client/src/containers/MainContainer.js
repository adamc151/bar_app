import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import getList from "../components/List/List";
import MyMap from "../components/GoogleMapWithSearch/map";
import "./MainContainer.css";
import Carousel from "../components/Carousel/Carousel";
import LoadingPage from '../components/LoadingPage/LoadingPage';
import Helmet from 'react-helmet';
import BarDetails from './BarDetails';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCarousel: true,
      showLoader: false,
      showMap: false,
      showBar: false
    };
  }

  componentDidMount(){
    setTimeout(() => { this.setState({'showLoader': true}) }, 2000);

    const url = window.location.pathname.split("/");
    if(url[1] === 'details'){
      const googleId = window.location.pathname.split("/").pop()
      !this.props.singleBar && this.props.actions.fetchOne(googleId);
    } else {
      this.props.actions.showMap();
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(!prevProps.singleBar && this.props.singleBar){
      this.props.actions.showMap();
    }
  }

  render() {
    console.log('yooo singleBar', this.props.singleBar);
    const {
      setUserCoordinates,
      setCenterCoordinates,
      setHoverCoordinates,
      setCarouselSlide,
      fetchData,
      fetchOne,
      setLoading,
      setSingleBar
    } = this.props.actions;
    const {
      centerCoordinates,
      userCoordinates,
      miles,
      timeFilter,
      hoverCoordinates,
      data,
      carouselSlide,
      loading,
      singleBar,
      animate,
      showMap
    } = this.props;

    const loadingModifier = loading ? 'loading' : '';
    const carouselAnimaionClassName = 'carouselAnimaion';
    const sideNavAnimaionClassName = animate ? 'sideNavAnimaion' : ''

    return (
      <Fragment>
        <Helmet>
            <meta charSet="utf-8" name="description" content="hapihour is an application that lets you
            find great drinks deals that are happing right now near you. hapihour displays your available options on a map with the crucial
            information you need to decide where to go next." />
            <title>Hapihour | Map</title>
            <link rel="canonical" href="hapihour.io" />
        </Helmet>

      {loading && this.state.showLoader && <LoadingPage />}

      {showMap && <div className={"wrapper " + loadingModifier}>
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
            setHoverCoordinates={setHoverCoordinates}
            setCarouselSlide={setCarouselSlide}
            displayCarousel={(bool) => {
              this.setState({ displayCarousel: bool });
            }}
            onMapsLoaded={() => {
              setLoading(false);
            }}
            miles={miles}
            timeFilter={timeFilter}
          />
        </div>

        <div className={'sideNav ' + sideNavAnimaionClassName}>
          <div className="list">{getList(data, (data) => { this.setState({ displayCarousel: false }); setSingleBar(data); })}</div>
        </div>

        {!loading && this.state.displayCarousel && (
          <div className={'carousel ' + carouselAnimaionClassName}>
            <Carousel
              controlledSlide={carouselSlide}
              initialSlide={carouselSlide}
              onSwipe={index => {
                if (!data[index]) return;
                setCarouselSlide(index);
                setCenterCoordinates(data[index].location.coordinates);
                setHoverCoordinates(data[index].location.coordinates);
              }}
            >
              {getList(data, (data) => { this.setState({ displayCarousel: false }); setSingleBar(data); })}
            </Carousel>
          </div>
        )}
      </div>}

      {this.props.singleBar && <BarDetails setSingleBar={setSingleBar} onBack={() => { this.setState({ displayCarousel: true }); }} />}

      </Fragment>
    );
  }

}


function mapStateToProps(state) {
  return state;
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
