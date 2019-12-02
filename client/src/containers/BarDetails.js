import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import "./BarDetails.css";
import Bar from "../components/Bar/Bar";
import navigate from "./icons/back.png";
import { Route } from "react-router-dom";
import twitterIcon from "./icons/twitter.png";
import beerIcon from "./icons/beer.png";
import instagramIcon from "./icons/instagram.png";
import facebookIcon from "./icons/facebook.png";
import emailIcon from "./icons/email.png";
import Helmet from 'react-helmet';

class BarDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fetchOne } = this.props.actions;
    const { data, singleBar } = this.props;

    return (
      <Route render={({ history }) => (
        <div className="wrapper barDetailsWrapper">
            <Helmet>
                <meta charSet="utf-8" name="description" content="hapihour is an application that lets you
                find great drinks deals that are happing right now near you. hapihour displays your available options on a map with the crucial
                information you need to decide where to go next." />
                <title>Hapihour | Details</title>
                <link rel="canonical" href="hapihour.io" />
            </Helmet>
            <div className="header">
            <div className="headerTextHapi" onClick={() => { history.push(`/`);}}>hapi</div>
            <div className="headerTextHour" onClick={() => { history.push(`/`);}}>hour</div>
            <img src={beerIcon} className="beerIconLanding" onClick={() => { history.push(`/`);}}/></div>
            <div className="navigationClass">
                  <img src={navigate} className="bottomTextbackNavigation" alt="back" onClick={() => {history.push(`/map`);}}/>
            </div>

            <div className="barContainer">
            <div className="barContainerGrow">
            <Bar fetchOne={fetchOne} data={data} singleBar={singleBar} />
            </div>
            <div className="footerCenter">
                <div className="footerItemTitle">SOMETHING WRONG? LET US KNOW</div>
                <a href="https://twitter.com/hapihour_io" className="inline"><img src={twitterIcon}/></a>
                <a className="inline dot">•</a>
                <a href="https://www.instagram.com/hapihour.io/" className="inline"><img src={instagramIcon}/></a>
                <a className="inline dot">•</a>
                <a href="https://www.facebook.com/hapihour.io" className="inline"><img src={facebookIcon}/></a>
                <a className="inline dot">•</a>
                <a href="mailto:hapihour.io@gmail.com" className="inline" target="_top"><img src={emailIcon}/></a>
            </div>

            </div>



            {/* <div className="donationWrapper">
                  <div className="donationItem">
                  {<div className="line">--</div>}
                      <div className="">
                          <div className="donationItemTitle">BUY US A ROUND?</div>
                          <div className="donationItemDesc">Hapihour is a free, self-funded product. If you enjoy think hapihour is useful, maybe buy us a coffee/ beer?</div>
                      </div>
                      <a href={'https://paypal.me/hapihour/3.5'}><img className="" src={'https://img.shields.io/badge/Donate-PayPal-orange.svg'}/></a>
                  </div>
            </div> */}

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
