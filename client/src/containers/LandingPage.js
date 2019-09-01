import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import "./LandingPage.css";
import SearchBar from "../components/SearchBar/SearchBar";
import LoadingPage from '../components/LoadingPage/LoadingPage';
import world from "./world.png";
import { Route } from "react-router-dom";

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    // const {
    //   fetchOne
    // } = this.props.actions;
    // const {
    //   data,
    //   singleBar
    // } = this.props;

    console.log("LandingPage page");

    return (
      <Route render={({ history }) => (

        <div className="wrapperLandingParent">
            <div className="wrapperLanding">
                <div className="titleLandingWrapper">
                    <div className="titleLanding" onClick={() => {history.push(`/`);}}>Welcome to hapihour.io</div>
                </div>
                <div className="animationLandingWrapper">
                    <div className="cssload-battery">
                        <div className="cssload-liquid"></div>
                    </div>
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
                        <img className="descriptionLandingItemImg" src={world}/>
                        <div className="descriptionLandingText">
                            <div className="descriptionLandingItemTitle">THIS IS THE TITLE</div>
                            <div className="descriptionLandingItemDesc">This is the description of the item to give more details</div>
                        </div>
                    </div>
                    <div className="descriptionLandingItem">
                        <img className="descriptionLandingItemImg" src={world}/>
                        <div className="descriptionLandingText">
                            <div className="descriptionLandingItemTitle">THIS IS THE TITLE</div>
                            <div className="descriptionLandingItemDesc">This is the description of the item to give more details</div>
                        </div>
                    </div>
                    <div className="descriptionLandingItem">
                        <img className="descriptionLandingItemImg" src={world}/>
                        <div className="descriptionLandingText">
                            <div className="descriptionLandingItemTitle">THIS IS THE TITLE</div>
                            <div className="descriptionLandingItemDesc">This is the description of the item to give more details</div>
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
