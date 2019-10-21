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
    console.log('componentDidMount', this.props);
  }

  componentDidUpdate(){
    console.log('componentDidUpdate', this.props);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Helmet title="hapihour" />
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
