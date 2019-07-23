import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Framework7 from 'framework7/framework7.esm.bundle';
import Framework7React from 'framework7-react';
import 'framework7/css/framework7.bundle.css';
import './css/icons.css';

import App from './components/app';
import * as serviceWorker from './serviceWorker';

import store from './store';

Framework7.use(Framework7React);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
