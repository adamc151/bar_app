import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainContainer from './containers/MainContainer';

require('matchmedia-polyfill');
require('matchmedia-polyfill/matchMedia.addListener');

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
