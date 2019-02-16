import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Fib from './containers/Fib';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Fib Calculator version 2</h1>
          </header>
          <div>
            <Route exact path="/" component={Fib} />
          </div>
      </div>
      </Router>
    );
  }
}

export default App;
