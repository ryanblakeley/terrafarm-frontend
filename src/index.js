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
// We first look for the authenticated token, and if that isn't available we
// use the registrar token so we can communicate with the database as an
// unauthenticated user. If you wish to use the anonymous token, you will have
// to manually inject it into a new network layer.
const token = localStorage.getItem('id_token') || window.registrarToken;
Relay.injectNetworkLayer(networkLayer(token));

ReactDOM.render(
  <Router
    render={applyRouterMiddleware(useRelay)}
    history={browserHistory}
    environment={Relay.Store}
    routes={routes}
  />,
  document.getElementById('root')
);
