import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainContainer from "./containers/MainContainer";
import ReactGA from 'react-ga';
try{
  ReactGA.initialize('UA-144974904-1');
}catch(e){
  ReactGA.initialize('UA-144974904-1', { testMode: true });
}
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <Route exact path="/" component={MainContainer} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
