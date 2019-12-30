import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainContainer from "./containers/MainContainer";
import FAQ from "./containers/FAQ";
import Admin from "./containers/Admin";
import ReactGA from 'react-ga';
import LandingPage from "./containers/LandingPage";
import Helmet from 'react-helmet';

try{
  ReactGA.initialize('UA-144974904-1');
}catch(e){
  ReactGA.initialize('UA-144974904-1', { testMode: true });
}
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {

  routeAdmin(){
    var req = new XMLHttpRequest();
    req.open('GET', document.location, false);
    req.send(null);
    var headers = req.getAllResponseHeaders().toLowerCase();


    var arr = headers.split('\r\n');
    headers = arr.reduce(function (acc, current, i){
          var parts = current.split(': ');
          acc[parts[0]] = parts[1];
          return acc;
    }, {});

    return headers.hh_header === 'hapihour' ? true : false;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Helmet>
            <meta charSet="utf-8" name="description" content="hapihour is an application that lets you
            find great drinks deals that are happing right now near you. hapihour displays your available options on a map with the crucial
             information you need to decide where to go next." />
            <title>Hapihour | Find Happy Hours That Are Happening Near You Right Now!</title>
            <link rel="canonical" href="hapihour.io" />
          </Helmet>
          <div>
            <Route path="/(map|details)/" component={MainContainer} />
            <Route exact path="/faq" component={FAQ} />
            <Route exact path="/admin/*" component={this.routeAdmin() ? Admin : LandingPage} />
            <Route exact path="/" component={LandingPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
