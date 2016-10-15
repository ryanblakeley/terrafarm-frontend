import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {
  Router,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router';
import useRelay from 'react-router-relay';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes';
import networkLayer from './shared/utils/networkLayer';

injectTapEventPlugin();
Relay.injectNetworkLayer(networkLayer);

ReactDOM.render(
  <Router
    render={applyRouterMiddleware(useRelay)}
    history={browserHistory}
    environment={Relay.Store}
    routes={routes}
  />,
  document.getElementById('root')
);
