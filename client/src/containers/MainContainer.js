import React, { Fragment, useEffect, useState, useRef } from "react";
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
import BarWrapper from "../components/Bar/BarWrapper";
import { getCityCoordinates } from "./getCityCoordinates";

const keys = require("../keys");
const API_KEY = keys.googleAPIKey;

// Hook
// function usePrevious(value) {
//   const ref = useRef();

//   // Store current value in ref
//   useEffect(() => {
//     ref.current = value;
//   }, [value]); // Only re-run if value changes

//   // Return previous value (happens before update in useEffect above)
//   return ref.current;
// }

const MainContainer = (props) => {

  const [displayCarousel, setDisplayCarousel] = useState(false);
  const [displaySideNav, setDisplaySideNav] = useState(false);
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {

    setDisplaySideNav(!props.loadingBars);
    setDisplayCarousel(!props.loadingBars && !props.singleBar);
    setDisplaySearchBar(!props.loadingBars && !props.singleBar);

    const url = window.location.pathname.split("/");
    if (url[1] !== "details") {

      props.actions.setSingleBar(null);
      setDisplayCarousel(!props.loadingBars);

    } else if (url[1] === "details") {
      !props.singleBar && props.actions.fetchOne(url[2]);
    }

  }, [props.loadingBars, props.singleBar, props.history.location.pathname]);

  const {
    setUserCoordinates,
    setCenterCoordinates,
    setHoverCoordinates,
    setCarouselSlide,
    fetchData,
    setSingleBar,
    getGooglePlacePhotos,
    clearPhotos,
    setBounds,
  } = props.actions;
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
    history,
  } = props;

  const loadingModifier = loading ? "loading" : "";

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

      {loading && showLoader && <LoadingPage />}

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
              setDisplayCarousel(bool);
            }}
            onMapsLoaded={(map) => {
              const location = window.location.pathname.split("/");
              const centerCoordinates = getCityCoordinates(location[2]);
              setCenterCoordinates(centerCoordinates);
            }}
            setBounds={setBounds}
            miles={miles}
            displaySearchBar={displaySearchBar}
            loading={loading}
            onMapReady={() => setMapReady(true)}
            history={history}
          />
        </div>

        {!loading && displaySideNav && (
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

        {!loading && displayCarousel && mapReady && (
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
          <Bar
            singleBar={singleBar}
            loading={false}
            getPhotos={() => {
              const url = window.location.pathname.split("/");
              getGooglePlacePhotos(url[2], API_KEY);
            }}
            photos={photos}
            loadingPhotos={loadingPhotos}
            history={history}
          />
        </BarWrapper>
      )}
    </Fragment>
  );

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
