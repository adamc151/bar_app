import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainContainer from "./containers/MainContainer";
import FAQ from "./containers/FAQ";
import ReactGA from "react-ga";
import LandingPage from "./containers/LandingPage/LandingPage";
import Helmet from "react-helmet";
import SellingPage from "./containers/SellingPage/SellingPage";

try {
  ReactGA.initialize("UA-144974904-1");
} catch (e) {
  ReactGA.initialize("UA-144974904-1", { testMode: true });
}
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Helmet>
            <meta
              charSet="utf-8"
              name="description"
              content="Hapihour is an application that lets you
            find great drinks deals that are happing right now in Leeds and London. Hapihour displays your available options on a map with the crucial
             information you need to decide where to go next."
            />
            <title>
              Hapihour | Find Happy Hours That Are Happening Near You Right Now
              In Leeds or London!
            </title>
            <link rel="canonical" href="hapihour.io" />
          </Helmet>
          <div>
            <Switch>
              <Route path="/(map|details)/" component={MainContainer} />
              <Route exact path="/faq" component={FAQ} />
              <Route exact path="/bar-info" component={SellingPage} />
              <Route path="/" component={LandingPage} />
              <Route component={LandingPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
