import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import "./LandingPage.css";
import location from "./pin.png";
import calendar from "./monday.png";
import beers from "./cheers.png";
import bar1 from "./barimg1.jpg";
import bar2 from "./barimg2.jpg";
import bar4 from "./barimg4.jpg";
import bar5 from "./barimg5.jpg";
import locationIcon from "./placeholder.png";
import twitterIcon from "./twitter.png";
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

    const barImgs = [bar1, bar2, bar4, bar5];
    const num = Math.floor(Math.random() * Math.floor(4));
    const barImg = barImgs[num];

    return (
      <Route render={({ history }) => (

        <div className="wrapperLandingParent">
            <div class="header">hapihour <img src={beerIcon} className="beerIconLanding"/></div>
            <div className="photosLandingWrapper">
                <img className="photoLanding" src={barImg}/>
            </div>
            <div className="titleDescriptionLandingWrapper" > 
                <div className="titleDescriptionLanding" >Search for a location</div> 
            </div>
            <div className="locationWrapper" >
                <div className="searchBarLandingWrapper" onClick={() => {history.push(`/map`);}}>Search..</div>
                <div className="currentLocationLanding" onClick={() => {history.push(`/map`);}}><img src={locationIcon}/></div>
            </div>
            <div className="descriptionAndTitleLandingWrapper">
                {/* <div className="descriptionLandingTitle">HOW HAPIHOUR WORKS</div> */}
                <img className="descriptionLandingItemFullLogo" src={fullLogo}/>
                <div className="descriptionLandingTitle">HOW IT WORKS</div>
                <div className="descriptionLandingWrapper">
                    <div className="descriptionLandingItem">
                        <img className="descriptionLandingItemImg" src={location}/>
                        <div className="descriptionLandingText">
                            <div className="descriptionLandingItemTitle">FIND YOUR LOCATION</div>
                            <div className="descriptionLandingItemDesc">Search for an area you want to see happy hours for or provide your current location.</div>
                        </div>
                    </div>
                    <div className="descriptionLandingItem">
                        <img className="descriptionLandingItemImg" src={calendar}/>
                        <div className="descriptionLandingText">
                            <div className="descriptionLandingItemTitle">SEE TODAY'S HAPI HOURS</div>
                            <div className="descriptionLandingItemDesc">See our listed happy hours for today on the map.</div>
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
            {/* <div className="bottomTextLandingWrapper">
                {<div className="bottomText">Want to get in touch?</div>}
                {<a href="https://twitter.com/hapihour_io" className="bottomText">Send us a message here</a>}
            </div> */}
            <div class="footer">
                <a href="https://twitter.com/hapihour_io" className="footerItem"><img src={twitterIcon}/></a>
                <a href="https://www.instagram.com/hapihour.io/" className="footerItem"><img src={instagramIcon}/></a>
                {/* <a href="https://twitter.com/hapihour_io" className="footerItem">EMAIL US</a> */}
                <a href="mailto:hapihour.io@gmail.com" className="footerItem" target="_top">EMAIL US</a>
                <a href="https://twitter.com/hapihour_io" className="footerItem">FAQ</a>
                {/* <a href="https://twitter.com/hapihour_io" className="footerItem">PRIVACY POLICY</a> */}
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
