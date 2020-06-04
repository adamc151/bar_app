import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../state/actions/actions";
import "./LandingPage.css";

import mobileHeader from "../images/tom_hh_1.jpg";
import desktopHeader from "../images/background_img2.jpg";
import locationIcon from "../icons/placeholder.png";
import twitterIcon from "../icons/twitter.png";
import emailIcon from "../icons/email.png";
import beerIcon from "../icons/beer.png";
import fullLogo from "../images/croppedLogo.png";
import instagramIcon from "../icons/instagram.png";
import facebookIcon from "../icons/facebook.png";
import { Route, Link } from "react-router-dom";
import Image from "../../components/Image/Image";
import { Parallax, Background } from "react-parallax";
import Preview from "./Preview/Preview";
import HowItWorks from "./HowItWorks/HowItWorks";

class LandingPage extends Component {
  componentDidMount() {
    this.props.actions.reset();
  }

  render() {
    // const barImgs = [bar1, bar2, bar3];
    // const num = Math.floor(Math.random() * Math.floor(barImgs.length));
    // // const barImg = barImgs[num];
    // const barImg = bar4;
    let barImg = "";
    let showMessage = true;

    const vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    if(vw < 650) {
      barImg = mobileHeader;
      showMessage= false;
    } else {
      barImg = desktopHeader;
    }

    return (
      <Route
        render={({ history }) => (
          <div className="wrapperLandingParent">
            <div className="photosLandingWrapper">
              <Parallax strength={300}>
                <Background className="custom-bg">
                  <Image
                    className="photoLanding"
                    imageLoadedStyle="photoLandingLoaded"
                    src={barImg}
                  />
                </Background>
              </Parallax>
            </div>

            <div className="photosLandingWrapper overlayWrapper">
              <div className="titleDescriptionLandingWrapper">
                <div className="titleDescriptionLanding">
                  Find the best happy hours happening right now.
                </div>
                {/* <p>cheap af</p> */}
              </div>

              <div className="supportedAreas">
                {showMessage && "Locations include:"}
                <div className="supportedAreasLinks">
                  <Link to={`/map/leeds`}>Leeds</Link>•
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

            {/* <img
              className="descriptionLandingItemFullLogo"
              alt="icon"
              src={fullLogo}
            /> */}

            <Preview />
            <HowItWorks />


            <Link to={`/map`}><button className="CheckItOutButton">Check it Out</button></Link>

            <div className="donationWrapper">
              <div className="donationItem">
                {/* {<div className="line">--</div>} */}
                <div className="">
                  <div className="donationItemTitle">Buy us a round?</div>
                  <div className="donationItemDesc">
                    Hapihour is a free, self-funded service. If you think
                    hapihour is useful, maybe buy us a coffee/beer to keep us
                    going?
                  </div>
                </div>
                <a href={"https://paypal.me/hapihour/3.5"}>
                  <img
                    alt="paypal"
                    className=""
                    src={
                      "https://img.shields.io/badge/Donate-PayPal-orange.svg"
                    }
                  />
                </a>
              </div>
            </div>

            <div className="footerCenter">
              <div
                className="faqFooter"
                onClick={() => {
                  history.push(`/faq`);
                }}
              >
                <a>FAQ</a>
              </div>
              <a href="https://twitter.com/hapihour_io" className="inline">
                <img alt="twitter icon" src={twitterIcon} />
              </a>
              <a className="inline dot">•</a>
              <a
                href="https://www.instagram.com/hapihour.io/"
                className="inline"
              >
                <img alt="instagram icon" src={instagramIcon} />
              </a>
              <a className="inline dot">•</a>
              <a href="https://www.facebook.com/hapihour.io" className="inline">
                <img alt="facebook icon" src={facebookIcon} />
              </a>
              <a className="inline dot">•</a>
              <a
                href="mailto:hapihour.io@gmail.com"
                className="inline"
                target="_top"
              >
                <img alt="email icon" src={emailIcon} />
              </a>
            </div>

            <div className="header">
              <div className="headerTextHapi">hapi</div>
              <div className="headerTextHour">hour</div>{" "}
              <img alt="beer icon" src={beerIcon} className="beerIconLanding" />
            </div>
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
