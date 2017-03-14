import React from 'react';
import Relay from 'react-relay';
import {
  Router,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router';
import useRelay from 'react-router-relay';
import ReactGA from 'react-ga';
import routes from './routes';

ReactGA.initialize(process.env.GOOGLE_ANALYTICS_KEY);

function logPageView () {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

const Root = _ => <Router
  render={applyRouterMiddleware(useRelay)}
  history={browserHistory}
  environment={Relay.Store}
  routes={routes}
  onUpdate={logPageView}
  key={Math.random()}
/>;

export default Root;
