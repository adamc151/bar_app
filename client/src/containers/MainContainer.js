import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import { isCoordinatesInView } from "../state/selectors";
import getList from "../components/List/List";
import MyMap from "../components/GoogleMapWithSearch/map";
import "./MainContainer.css";
import Carousel from "../components/Carousel/Carousel";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import Helmet from "react-helmet";
import Bar from "../components/Bar/Bar";
import AdminForm from "../components/AdminForm/AdminForm";
import BarWrapper from "../components/Bar/BarWrapper";
import { getCityCoordinates } from "./getCityCoordinates";

const keys = require("../keys");
const API_KEY = keys.googleAPIKey;
const HH_HEADER = keys.hhHeader;

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCarousel: false,
      displaySideNav: false,
      displaySearchBar: false,
      showLoader: false,
      showMap: false,
      editBar: false,
      mapReady: false,
    };

    this.routeAdmin = this.routeAdmin.bind(this);
  }

  routeAdmin() {
    var req = new XMLHttpRequest();
    req.open("GET", document.location, false);
    req.send(null);
    var headers = req.getAllResponseHeaders().toLowerCase();

    var arr = headers.split("\r\n");
    headers = arr.reduce(function (acc, current, i) {
      var parts = current.split(": ");
      acc[parts[0]] = parts[1];
      return acc;
    }, {});

    return headers.hh_header === HH_HEADER ? true : false;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showLoader: true });
    }, 2000);
    const { singleBar } = this.props;
    const { fetchOne } = this.props.actions;

    const url = window.location.pathname.split("/");
    if (url[1] === "details") {
      const googleId = url[2];
      const editBar = url[3] === "edit";
      !singleBar && this.routeAdmin() && this.setState({ editBar });
      !singleBar && fetchOne(googleId);
    } else {
      this.setState({ displaySearchBar: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loadingBars && !this.props.loadingBars) {
      this.setState({ displaySideNav: true });
    }

    if (prevProps.singleBar && !this.props.singleBar) {
      this.setState({ displayCarousel: true, displaySearchBar: true });
    }

    if (!prevProps.singleBar && this.props.singleBar) {
      this.setState({ displayCarousel: false, displaySearchBar: false });
    }

    const url = window.location.pathname.split("/");
    if (url[1] !== "details") {
      this.props.actions.setSingleBar(null);
      if (prevProps.loadingBars && !this.props.loadingBars) {
        this.setState({ displayCarousel: true });
      }
    } else if (url[1] === "details") {
      const googleId = url[2];
      const editBar = url[3] === "edit";
      !this.props.singleBar && this.props.actions.fetchOne(googleId);
      !prevProps.singleBar &&
        this.props.singleBar &&
        this.routeAdmin() &&
        this.setState({ editBar });
    }
  }

  render() {
    const {
      setUserCoordinates,
      setCenterCoordinates,
      setHoverCoordinates,
      setCarouselSlide,
      fetchData,
      setSingleBar,
      getGooglePlacePhotos,
      getGooglePlace,
      clearPhotos,
      setBounds,
    } = this.props.actions;
    const {
      centerCoordinates,
      userCoordinates,
      miles,
      jwt,
      hoverCoordinates,
      data,
      carouselSlide,
      loading,
      singleBar,
      photos,
      loadingPhotos,
      mapBounds,
      place,
      history,
    } = this.props;

    const loadingModifier = loading ? "loading" : "";

    const getPhotos = () => {
      const url = window.location.pathname.split("/");
      getGooglePlacePhotos(url[2], API_KEY);
    };

    return (
      <Fragment>
        <Helmet>
          <meta
            charSet="utf-8"
            name="description"
            content="Hapihour is an application that lets you
            find great drinks deals that are happing right now in Leeds and London. Hapihour displays your available options on a map with the crucial
             information you need to decide where to go next."
          />
          <title>Hapihour | Map</title>
          <link rel="canonical" href="hapihour.io" />
        </Helmet>

        {loading && this.state.showLoader && <LoadingPage />}

        <div className={"wrapper " + loadingModifier}>
          <div className="mapContainer">
            <MyMap
              userCoordinates={userCoordinates}
              setUserCoordinates={setUserCoordinates}
              centerCoordinates={centerCoordinates}
              setCenterCoordinates={setCenterCoordinates}
              fetchData={fetchData}
              jwt={jwt}
              data={data}
              hoverCoordinates={hoverCoordinates}
              setHoverCoordinates={setHoverCoordinates}
              setCarouselSlide={setCarouselSlide}
              displayCarousel={(bool) => {
                this.setState({ displayCarousel: bool });
              }}
              onMapsLoaded={(map) => {
                const location = window.location.pathname.split("/");
                const centerCoordinates = getCityCoordinates(location[2]);
                setCenterCoordinates(centerCoordinates);
              }}
              setBounds={setBounds}
              miles={miles}
              displaySearchBar={this.state.displaySearchBar}
              loading={loading}
              onMapReady={() => this.setState({ mapReady: true })}
              history={history}
            />
          </div>

          {!loading && this.state.displaySideNav && (
            <div className={"sideNav sideNavAnimaion"}>
              <div className="list">
                {getList(
                  data,
                  setSingleBar,
                  (data) => {
                    setHoverCoordinates(data.location.coordinates);
                    const isInView = isCoordinatesInView(
                      data.location.coordinates,
                      mapBounds
                    );
                    if (!isInView) {
                      setCenterCoordinates([
                        data.location.coordinates[0] + Math.random() / 400,
                        data.location.coordinates[1] + Math.random() / 400,
                      ]);
                    }
                  },
                  carouselSlide,
                  hoverCoordinates
                )}
              </div>
            </div>
          )}

          {!loading && this.state.displayCarousel && this.state.mapReady && (
            <div className={"carousel carouselAnimaion"}>
              <Carousel
                controlledSlide={carouselSlide}
                initialSlide={carouselSlide}
                onSwipe={(index) => {
                  if (!data[index]) return;
                  setCarouselSlide(index);
                  setCenterCoordinates(data[index].location.coordinates);
                  setHoverCoordinates(data[index].location.coordinates);
                }}
              >
                {getList(data, setSingleBar)}
              </Carousel>
            </div>
          )}
        </div>

        {singleBar && (
          <BarWrapper clearPhotos={clearPhotos}>
            {this.state.editBar ? (
              <AdminForm
                singleBar={singleBar}
                getPhotos={getPhotos}
                getPlace={getGooglePlace}
                photos={photos}
                jwt={jwt}
                place={place}
              />
            ) : (
              <Bar
                singleBar={singleBar}
                loading={this.state.loadingBar}
                getPhotos={getPhotos}
                photos={photos}
                loadingPhotos={loadingPhotos}
                history={history}
              />
            )}
          </BarWrapper>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
