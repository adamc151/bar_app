import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import "./LandingPage.css";
import location from "./icons/pin.png";
import calendar from "./icons/calendar2.png";
import beers from "./icons/cheers.png";
import bar1 from "./images/barImg111.jpg";
import bar2 from "./images/barImg222.jpg";
import bar3 from "./images/barImg333.jpg";
import locationIcon from "./icons/placeholder.png";
import twitterIcon from "./icons/twitter.png";
import emailIcon from "./icons/email.png";
import beerIcon from "./icons/beer.png";
import fullLogo from "./icons/fullLogo.png";
import instagramIcon from "./icons/instagram.png";
import facebookIcon from "./icons/facebook.png";
import discoverIcon from "./icons/discover.png";
import { Route, Link } from "react-router-dom";
import Image from "../components/Image/Image";
import InstagramEmbed from 'react-instagram-embed';

class LandingPage extends Component {

  componentDidMount() {
    this.props.actions.reset();
  }

  renderInsta() {

    const instaUrls = ['https://www.instagram.com/p/B60vLc8HdVP', 'https://www.instagram.com/p/B8HM9pWHUN3', 'https://www.instagram.com/p/B7bUXu6HBSA' ];

    return instaUrls.map((data, i) => {
      return <InstagramEmbed
                url= {data}
                className="singleInsta"
                maxWidth={400}
                hideCaption={true}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
              />
    });
  }

  render() {
    const barImgs = [bar1, bar2, bar3];
    const num = Math.floor(Math.random() * Math.floor(barImgs.length));
    const barImg = barImgs[num];

    return (
      <Route
        render={({ history }) => (
          <div className="wrapperLandingParent">
            <div className="header">
              <div className="headerTextHapi">hapi</div>
              <div className="headerTextHour">hour</div>{" "}
              <img alt='beer icon' src={beerIcon} className="beerIconLanding" />
            </div>

            <div className="photosLandingWrapper">
              <Image
                className="photoLanding"
                imageLoadedStyle="photoLandingLoaded"
                src={barImg}
              />
            </div>

            <div className="titleDescriptionLandingWrapper">
              <div className="titleDescriptionLanding">
                Search for a location
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

            <img
              className="descriptionLandingItemFullLogo"
              alt="icon"
              src={fullLogo}
            />

            <div className="descriptionColourWrapper">
              <div className="descriptionAndTitleLandingWrapper">
                <div className="descriptionLandingTitle">HOW IT WORKS</div>
                <div className="descriptionLandingWrapper">
                  <div className="descriptionLandingItem">
                    <img
                      className="descriptionLandingItemImg"
                      alt="location"
                      src={location}
                    />
                    <div className="descriptionLandingText">
                      <div className="descriptionLandingItemTitle">
                        FIND YOUR LOCATION
                      </div>
                      <div className="descriptionLandingItemDesc">
                        Search for an area you want to see happy hour deals for, or provide your current location.
                      </div>
                    </div>
                  </div>
                  <div className="descriptionLandingItem">
                    <img
                      className="descriptionLandingItemImg"
                      alt="calendar"
                      src={calendar}
                    />
                    <div className="descriptionLandingText">
                      <div className="descriptionLandingItemTitle">
                        SEE TODAY'S HAPI HOURS
                      </div>
                      <div className="descriptionLandingItemDesc">
                        See active & upcoming happy hours for today on the map.
                      </div>
                    </div>
                  </div>
                  <div className="descriptionLandingItem">
                    <img
                      className="descriptionLandingItemImg"
                      alt="beers"
                      src={discoverIcon}
                    />
                    <div className="descriptionLandingText">
                      <div className="descriptionLandingItemTitle">
                        DISCOVER NEW BARS
                      </div>
                      <div className="descriptionLandingItemDesc">
                        Find out more about the bars offering great deals throughout the city.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="instaFeed">
              {this.renderInsta()}
            </div>

            <div className="donationWrapper">
              <div className="donationItem">
                {<div className="line">--</div>}
                <div className="">
                  <div className="donationItemTitle">BUY US A ROUND? :)</div>
                  <div className="donationItemDesc">
                    Hapihour is a free, self-funded product. If you think
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
          </div>
        )}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
