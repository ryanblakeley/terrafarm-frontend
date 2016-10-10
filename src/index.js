import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {
  Router,
  browserHistory,
  match,
  applyRouterMiddleware,
} from 'react-router';
import useRelay from 'react-router-relay';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes';
import networkLayer from './lib/networkLayer';

injectTapEventPlugin();

// Inject the Network Layer
const token = localStorage.getItem('id_token') || window.anonymousToken;
Relay.injectNetworkLayer(networkLayer(token));

match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
  ReactDOM.render(
    <Router {...renderProps} render={applyRouterMiddleware(useRelay)} />,
    document.getElementById('root')
  );
});
