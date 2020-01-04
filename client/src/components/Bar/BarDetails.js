import React, { Component } from "react";
import "./BarDetails.css";
import navigate from "../../containers/icons/back.png";
import { Route } from "react-router-dom";
import twitterIcon from "../../containers/icons/twitter.png";
import beerIcon from "../../containers/icons/beer.png";
import instagramIcon from "../../containers/icons/instagram.png";
import facebookIcon from "../../containers/icons/facebook.png";
import emailIcon from "../../containers/icons/email.png";
import Helmet from 'react-helmet';

class BarDetails extends Component {

  componentWillUnmount(){
    this.props.clearPhotos();
  }

  render() {
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
            <img src={beerIcon} alt='icon' className="beerIconLanding" onClick={() => { history.push(`/`);}}/></div>
            <div className="navigationClass">
                  <img src={navigate} className="bottomTextbackNavigation" alt="back" onClick={() => { history.push(`/map`); }}/>
            </div>

            <div className="barContainer">
            <div className="barContainerGrow">{this.props.children}</div>
            <div className="footerCenter">
                <div className="footerItemTitle">SOMETHING WRONG? LET US KNOW</div>
                <a href="https://twitter.com/hapihour_io" className="inline"><img alt='twitter' src={twitterIcon}/></a>
                <a className="inline dot">•</a>
                <a href="https://www.instagram.com/hapihour.io/" className="inline"><img alt='instagram' src={instagramIcon}/></a>
                <a className="inline dot">•</a>
                <a href="https://www.facebook.com/hapihour.io" className="inline"><img alt='facebook' src={facebookIcon}/></a>
                <a className="inline dot">•</a>
                <a href="mailto:hapihour.io@gmail.com" className="inline" target="_top"><img alt='email' src={emailIcon}/></a>
            </div>

            </div>

        </div>
      )} />
    );
  }
}


export default BarDetails;
