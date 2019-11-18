import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import "./LandingPage.css";
import location from "./pin.png";
import calendar from "./monday.png";
import beers from "./cheers.png";
import bar1 from "./barImg111.jpg";
import bar2 from "./barImg222.jpg";
import bar3 from "./barImg333.jpg";
// import bar5 from "./barimg5.jpg";
import locationIcon from "./placeholder.png";
import twitterIcon from "./twitter.png";
import emailIcon from "./email.png";
import beerIcon from "./beer.png";
import fullLogo from "./fullLogo.png";
import instagramIcon from "./instagram.png";
import { Route } from "react-router-dom";

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

}

render() {

    const barImgs = [bar1, bar2, bar3];
    const num = Math.floor(Math.random() * Math.floor(barImgs.length));
    const barImg = barImgs[num];

    return (
      <Route render={({ history }) => (

        <div className="wrapperLandingParent">
            <div className="header"><div className="headerTextHapi">hapi</div><div className="headerTextHour">hour</div> <img src={beerIcon} className="beerIconLanding"/></div>

            <div className="photosLandingWrapper">
                <img className="photoLanding" src={barImg}/>
            </div>

            <div className="titleDescriptionLandingWrapper" > 
                <div className="titleDescriptionLanding" >Search for a location</div> 
            </div>

            <div className="locationWrapper" >
                <div className="searchBarLandingWrapper" onClick={() => {history.push(`/map`);}}>Search...</div>
                <div className="currentLocationLanding" onClick={() => {history.push(`/map`);}}><img src={locationIcon}/></div>
            </div>

            <div className="descriptionAndTitleLandingWrapper">
                <img className="descriptionLandingItemFullLogo" src={fullLogo}/>
                <div className="descriptionLandingTitle">HOW IT WORKS</div>
                <div className="descriptionLandingWrapper">
                    <div className="descriptionLandingItem">
                        <img className="descriptionLandingItemImg" src={location}/>
                        <div className="descriptionLandingText">
                            <div className="descriptionLandingItemTitle">FIND YOUR LOCATION</div>
                            <div className="descriptionLandingItemDesc">Search for an area you want to see hapi hours for or provide your current location.</div>
                        </div>
                    </div>
                    <div className="descriptionLandingItem">
                        <img className="descriptionLandingItemImg" src={calendar}/>
                        <div className="descriptionLandingText">
                            <div className="descriptionLandingItemTitle">SEE TODAY'S HAPI HOURS</div>
                            <div className="descriptionLandingItemDesc">See our active & upcoming hapi hours for today on the map.</div>
                        </div>
                    </div>
                    <div className="descriptionLandingItem">
                        <img className="descriptionLandingItemImg" src={beers}/>
                        <div className="descriptionLandingText">
                            <div className="descriptionLandingItemTitle">PLAN YOUR NIGHT</div>
                            <div className="descriptionLandingItemDesc">See currently active happy hours as well as those about to start so you can plan your next move!</div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="donationWrapper">
                  <div className="donationItem">
                  {<div className="line">--</div>}
                      <div className="">
                          <div className="donationItemTitle">BUY US A ROUND? :)</div>
                          <div className="donationItemDesc">Hapihour is a free, self-funded product. If you think hapihour is useful, maybe buy us a coffee/beer to keep us going?</div>
                      </div>
                      <a href={'https://paypal.me/hapihour/3.5'}><img className="" src={'https://img.shields.io/badge/Donate-PayPal-orange.svg'}/></a>
                  {/* {<div className="line">--</div>} */}
                  </div>
            </div>

            <div className="footerCenter">
                <div className="faqFooter" onClick={() => {history.push(`/faq`);}}><a>FAQs</a></div>
                <div className="footerItemTitle">CONTACT US</div>
                <a href="https://twitter.com/hapihour_io" className="inline"><img src={twitterIcon}/></a>
                <a className="inline dot">•</a>
                <a href="https://www.instagram.com/hapihour.io/" className="inline"><img src={instagramIcon}/></a>
                <a className="inline dot">•</a>
                <a href="mailto:hapihour.io@gmail.com" className="inline" target="_top"><img src={emailIcon}/></a>
            </div>
        </div>
      )} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
