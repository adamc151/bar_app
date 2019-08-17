import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import List from "../components/List/List";
import ListItem from "../components/List/ListItem";
import MyMap from "../components/GoogleMapWithSearch/map";
import "./MainContainer.css";
import Carousel from "../components/Carousel/Carousel";
import LoadingPage from '../components/LoadingPage/LoadingPage';
import BarDetails from './BarDetails';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCarousel: true,
      showLoader: false,
      showSideBar: false
    };
  }

  componentDidMount(){
    setTimeout(() => { this.setState({'showLoader': true}) }, 2000);
    this.props.actions.clearSingleBar();
  }

  render() {
    const {
      setUserCoordinates,
      setCenterCoordinates,
      setHoverCoordinates,
      setCarouselSlide,
      fetchData,
      fetchOne,
      setLoading,
      clearSingleBar
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
      selectedBar,
      animate
    } = this.props;

    const list = this.props.data.length > 0 ? this.props.data.map((data, i) => {
      return (
        <ListItem
          key={i}
          index={i}
          data={data}
          onHover={this.props.onHover}
          className="carouselCard"
        />
      );
    }) : null;

    const loadingModifier = loading ? 'loading' : '';
    const sideNavClassName = animate ? 'sideNavWithAnimate' : 'sideNav'
    const carouselClassName = animate ? 'carouselWithAnimate' : 'carousel'
    const sideNavModifier = this.state.showSideBar ? 'sideNavOpen' : '';
    const sideCarouselModifier= this.state.showSideBar ? this.state.displayCarousel ? 'carouselOpen' : '' : '';

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
            onMapsLoaded={() => {
              setLoading(false);
              setTimeout(() => { this.setState({'showSideBar': true}) }, 50);
            }}
            miles={miles}
            timeFilter={timeFilter}
          />
        </div>


        <div className={sideNavClassName + ' ' + sideNavModifier}>
          <div className="list">{list}</div>
        </div>

        {!loading && (
          <div className={carouselClassName + ' ' + sideCarouselModifier}>
            <Carousel
              controlledSlide={carouselSlide}
              onSwipe={index => {
                if (!data[index]) return;
                setCarouselSlide(index);
                setCenterCoordinates(data[index].location.coordinates);
                setHoverCoordinates(data[index].location.coordinates);
              }}
            >
              {list || <ListItem data="" className="carouselCard" />}
            </Carousel>
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
    carouselSlide: state.carouselSlide,
    animate: state.animate,
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
