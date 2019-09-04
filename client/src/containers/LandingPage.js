import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import "./LandingPage.css";
import SearchBar from "../components/SearchBar/SearchBar";
import location from "./pin.png";
import calendar from "./monday.png";
import beers from "./cheers.png";
import bar1 from "./barimg1.jpg";
import { Route } from "react-router-dom";

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Route render={({ history }) => (

        <div className="wrapperLandingParent">
            <div className="photosLandingWrapper">
                <img className="photoLanding" src={bar1}/>    
            </div>
            <div className="wrapperLanding">
                <div className="titleLandingWrapper">
                    <div className="titleLanding" onClick={() => {history.push(`/map`);}}>hapihour</div>
                </div>
                <div className="searchBarLandingWrapper">
                    {/* <div className="searchBarLanding">SEARCH BAR HERE</div> */}
                    <SearchBar
                        // className={"searchbar searchBarLanding"}
                        getNode={node => (this.searchBox = node)}
                        // onChange={this.findPlace}
                        // onClickButton={this.getLocation}
                        // onfocusin={searchbarFocusIn}
                        // onfocusout={searchbarFocusOut}
                        // fetchingUserLocation={fetchingUserLocation}
                    />
                </div>
                <div className="descriptionLandingTitle">HOW HAPIHOUR WORKS</div>
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
            <div className="bottomTextWrapper">
                {<div className="bottomText">Want to get in touch?</div>}
                {<a href="https://twitter.com/hapihour_io" className="bottomText">Send us a message here</a>}
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
