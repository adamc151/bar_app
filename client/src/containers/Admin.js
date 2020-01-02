import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import "./Admin.css";
import AdminForm from "../components/AdminForm/AdminForm"
import { Route } from "react-router-dom";
import twitterIcon from "./icons/twitter.png";
import beerIcon from "./icons/beer.png";
import instagramIcon from "./icons/instagram.png";
import facebookIcon from "./icons/facebook.png";
import emailIcon from "./icons/email.png";
import Helmet from 'react-helmet';
import axios from "axios";

const keys = require("../keys");
const API_KEY = keys.googleAPIKey;

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = { singleBar: '' };
    }

    componentDidMount(){
        // const url = window.location.pathname.split("/");

        // if(url[1] === 'admin'){
        //     const googleId = window.location.pathname.split("/").pop()
        //     this.fetchOne(googleId);
        // }
    }

    // fetchOne(id) {
    //     var self = this;

    //     axios.get("/api/bar", {
    //         params: { place_id: id }
    //     })
    //     .then(function (response) {
    //         self.setState({ singleBar: response.data });
    //     });
    // }

    render() {

        return (
            <Route render={({ history }) => (
                <div className="wrapper barDetailsWrapper">

                    <Helmet>
                        <meta charSet="utf-8" name="description" content="hapihour is an application that lets you
                        find great drinks deals that are happing right now near you. hapihour displays your available options on a map with the crucial
                        information you need to decide where to go next." />
                        <title>Hapihour | Admin</title>
                        <link rel="canonical" href="hapihour.io" />
                    </Helmet>

                    <div className="header">
                        <div className="headerTextHapi" onClick={() => { history.push(`/`);}}>hapi</div>
                        <div className="headerTextHour" onClick={() => { history.push(`/`);}}>hour</div>
                        <img src={beerIcon} className="beerIconLanding" onClick={() => { history.push(`/`);}}/>
                    </div>

                    <div className="barContainer">

                        <div className="barContainerGrow adminBackground">
                            <div className="adminContainer">
                                {this.state.singleBar && <AdminForm singleBar={this.state.singleBar}/>}
                            </div>
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

function mapStateToProps(state) {
    return state;
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Admin);
