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
import ReactGA from 'react-ga';

import routes from './routes';
import networkLayer from './shared/utils/networkLayer';

injectTapEventPlugin();
ReactGA.initialize(process.env.GA_TRACKING_ID);
Relay.injectNetworkLayer(networkLayer);

function logPageView () {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

ReactDOM.render(
  <Router
    render={applyRouterMiddleware(useRelay)}
    history={browserHistory}
    environment={Relay.Store}
    routes={routes}
    onUpdate={logPageView}
  />,
  document.getElementById('root')
);
