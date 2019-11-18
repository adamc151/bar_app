import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainContainer from "./containers/MainContainer";
import BarDetails from "./containers/BarDetails";
import FAQ from "./containers/FAQ";
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

  componentDidMount(){
    // console.log('componentDidMount', this.props);
  }

  componentDidUpdate(){
    // console.log('componentDidUpdate', this.props);
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
            <Route exact path="/map" component={MainContainer} />
            <Route exact path="/faq" component={FAQ} />
            <Route exact path="/details/:id" component={BarDetails} />
            <Route exact path="/" component={LandingPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
