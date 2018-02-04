import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { reducer } from './Containers/reducer';
import registerServiceWorker from './registerServiceWorker';
import App from './Containers/App';
import './index.css';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
