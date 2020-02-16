import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import getList from "../components/List/List";
import MyMap from "../components/GoogleMapWithSearch/map";
import "./MainContainer.css";
import Carousel from "../components/Carousel/Carousel";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import Helmet from "react-helmet";
import Bar from "../components/Bar/Bar";
import AdminForm from "../components/AdminForm/AdminForm";
import BarDetails from "../components/Bar/BarDetails";
import { getCityCoordinates } from "./getCityCoordinates";

const keys = require("../keys");
const API_KEY = keys.googleAPIKey;
const HH_HEADER = keys.hhHeader;

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCarousel: false,
      displaySearchBar: false,
      showLoader: false,
      showMap: false,
      editBar: false
    };

    this.routeAdmin = this.routeAdmin.bind(this);
  }

  routeAdmin() {
    var req = new XMLHttpRequest();
    req.open("GET", document.location, false);
    req.send(null);
    var headers = req.getAllResponseHeaders().toLowerCase();

    var arr = headers.split("\r\n");
    headers = arr.reduce(function(acc, current, i) {
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
      clearPhotos
    } = this.props.actions;
    const {
      centerCoordinates,
      userCoordinates,
      miles,
      timeFilter,
      jwt,
      hoverCoordinates,
      data,
      carouselSlide,
      loading,
      singleBar,
      photos
    } = this.props;

    const loadingModifier = loading ? "loading" : "";

    const getPhotos = () => {
      console.log("yoooo getPhotos");
      const url = window.location.pathname.split("/");
      getGooglePlacePhotos(url[2], API_KEY);
    };

    return (
      <Fragment>
        <Helmet>
          <meta
            charSet="utf-8"
            name="description"
            content="hapihour is an application that lets you
            find great drinks deals that are happing right now near you. hapihour displays your available options on a map with the crucial
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
              displayCarousel={bool => {
                this.setState({ displayCarousel: bool });
              }}
              onMapsLoaded={() => {
                const location = window.location.pathname.split("/").pop();
                setCenterCoordinates(getCityCoordinates(location));
              }}
              miles={miles}
              timeFilter={timeFilter}
              displaySearchBar={this.state.displaySearchBar}
              loading={loading}
            />
          </div>

          <div className={"sideNav sideNavAnimaion"}>
            <div className="list">
              {getList(data, setSingleBar, data => {
                setCenterCoordinates(data.location.coordinates);
                setHoverCoordinates(data.location.coordinates);
              })}
            </div>
          </div>

          {!loading && this.state.displayCarousel && (
            <div className={"carousel carouselAnimaion"}>
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
                {getList(data, setSingleBar)}
              </Carousel>
            </div>
          )}
        </div>

        {singleBar && (
          <BarDetails clearPhotos={clearPhotos}>
            {this.state.editBar ? (
              <AdminForm
                singleBar={singleBar}
                getPhotos={getPhotos}
                photos={photos}
                jwt={jwt}
              />
            ) : (
              <Bar
                singleBar={singleBar}
                loading={this.state.loadingBar}
                getPhotos={getPhotos}
                photos={photos}
              />
            )}
          </BarDetails>
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
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
