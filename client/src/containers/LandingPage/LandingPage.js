import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../state/actions/actions";
import "./LandingPage.css";
import { Route, Link } from "react-router-dom";
import { Parallax, Background } from "react-parallax";

import mobileHeader from "../images/tom_hh_2.jpg";
import desktopHeader from "../images/group_1.jpg";
import locationIcon from "../icons/placeholder.png";
import Image from "../../components/Image/Image";
import Preview from "./Preview/Preview";
import HowItWorks from "./HowItWorks/HowItWorks";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Donation from "./Donation/Donation";
import Testimonials from "./Testimonials/Testimonials";

class LandingPage extends Component {
  componentDidMount() {
    this.props.actions.reset();
  }

  render() {
    let barImg = "";
    let showMessage = true;

    const vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    if (vw < 650) {
      barImg = mobileHeader;
      showMessage = false;
    } else {
      barImg = desktopHeader;
    }

    const barSellingBanner = (
      <div
        className="SellingPageCallToAction"
        style={{ marginTop: "-0px", opacity: "0.95" }}
      >
        <h2>Own a bar or resturant and want to get your deals seen?</h2>
        <Link to={`/bar-info`}>
          <button onClick={this.handleOpenModal}>
            See our premium features
          </button>
        </Link>
        <p>Free earlybird access • No credit card required</p>
      </div>
    );

    return (
      <Route
        render={({ history }) => (
          <div className="wrapperLandingParent">
            <Header history={history} />
            <div className="photosLandingWrapper">
              <Parallax strength={300}>
                <Background className="custom-bg">
                  <Image
                    className="photoLanding"
                    imageLoadedStyle="photoLandingLoaded"
                    src={barImg}
                    alt={"Bar"}
                  />
                </Background>
              </Parallax>
            </div>

            <div className="photosLandingWrapper overlayWrapper">
              <div className="titleDescriptionLandingWrapper">
                <div className="titleDescriptionLanding">
                  Find the best happy hours happening right now.
                </div>
                <div className="supportedAreas">
                  {showMessage && "Locations include:"}
                  <div className="supportedAreasLinks">
                    <Link to={`/map/leeds`}>Leeds</Link>
                    <a>•</a>
                    <Link to={`/map/clapham`}>London - Clapham</Link>
                  </div>
                </div>
                <div className="locationWrapper">
                  <div className="searchBarLandingWrapper">
                    <Link to={`/map`}>Search...</Link>
                  </div>
                  <div className="currentLocationLanding">
                    <Link to={`/map`}>
                      <img alt="location icon" src={locationIcon} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Preview />
            <HowItWorks />
            <Link to={`/map`}>{" "}<button className="CheckItOutButton">Try For Free</button></Link>
            <Testimonials />
            {barSellingBanner}
            {/* <Donation /> */}
            <Footer />
          </div>
        )}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
