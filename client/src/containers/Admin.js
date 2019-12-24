import React, { Component } from "react";
// import "./BarDetails.css";
import navigate from "./icons/back.png";
import { Route } from "react-router-dom";
import twitterIcon from "./icons/twitter.png";
import beerIcon from "./icons/beer.png";
import instagramIcon from "./icons/instagram.png";
import facebookIcon from "./icons/facebook.png";
import emailIcon from "./icons/email.png";
import Helmet from 'react-helmet';
import axios from "axios";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { singleBar: '' };
  }

  componentDidMount(){
    console.log('doing the split');
    const url = window.location.pathname.split("/");
    if(url[1] === 'admin'){
      const googleId = window.location.pathname.split("/").pop()
      this.fetchOne(googleId);
    }
  }

  fetchOne(id) {
      var self = this;
      axios.get("/api/bar", {
        params: { place_id: id }
      })
      .then(function (response) {
        console.log(response.data);
        self.setState({ singleBar: response.data });
      });
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
            <img src={beerIcon} className="beerIconLanding" onClick={() => { history.push(`/`);}}/></div>
            {/* <div className="navigationClass">
                  <img src={navigate} className="bottomTextbackNavigation" alt="back" onClick={() => { history.push(`/map`); }}/>
            </div> */}

            <div className="barContainer">
            <div className="barContainerGrow">
                admin page
                {this.state.singleBar.name}
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

        </div>
      )} />
    );
  }
}


export default Admin;
