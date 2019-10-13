import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import "./BarDetails.css";
import Bar from "../components/Bar/Bar";
import navigate from "./back.png";
import { Route } from "react-router-dom";
import twitterIcon from "./twitter.png";
import beerIcon from "./beer.png";
import instagramIcon from "./instagram.png";
import emailIcon from "./email.png";

class BarDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {
      fetchOne
    } = this.props.actions;
    const {
      data,
      singleBar
    } = this.props;

    console.log("BarDetails page");

    return (
      <Route render={({ history }) => (
        <div className="wrapper barDetailsWrapper">
            {/* <div class="header" onClick={() => { history.push(`/`);}}>hapihour<img src={beerIcon} className="beerIconLanding"/></div> */}
            <div className="header" onClick={() => { history.push(`/`);}}><div className="headerTextHapi">hapi</div><div className="headerTextHour">hour</div> <img src={beerIcon} className="beerIconLanding"/></div>
            <div className="navigationClass">
            {/* {<a href="/" className="bottomTextbackNavigation">{"<"}</a>} */}
            {<img
                src={navigate}
                className="bottomTextbackNavigation"
                alt="back"
                onClick={() => {
                  history.push(`/map`);
                }}
            />}
            </div>
            <div className="barContainer">
            <Bar
                fetchOne={fetchOne}
                data={data}
                singleBar={singleBar}
            />
            </div>
            {/* <div className="bottomTextWrapper">
            {<div className="bottomText">Something wrong with this listing?</div>}
            {<a href="https://twitter.com/hapihour_io" className="bottomText">Send us a message here</a>}
            </div> */}
            <div class="footerCenter">
                <div className="footerItemTitle">SOMETHING WRONG? LET US KNOW</div>
                {/* <div className="footerItemTitle">LET US KNOW:</div> */}
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
    loading: state.loading,
    data: state.data,
    singleBar: state.singleBar
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
)(BarDetails);
