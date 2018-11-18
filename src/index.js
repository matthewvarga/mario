import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';
import Scroller from './components/scroller/index';
import './index.css';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
      <Scroller />
  </Provider>, 
  document.getElementById('root')
);
serviceWorker.unregister();