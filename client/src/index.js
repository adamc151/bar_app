import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import reducer from './state/reducers/reducer';
import thunk from 'redux-thunk';

// const store = createStore(
//   reducer,
//   compose(
//   applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// );

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

ReactDOM.render(<Provider store={store}>
      <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
