import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  browserHistory,
  match,
  applyRouterMiddleware,
} from 'react-router';
import useRelay from 'react-router-relay';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';

injectTapEventPlugin();

match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
  ReactDOM.render(
    <Router {...renderProps} render={applyRouterMiddleware(useRelay)} />,
    document.getElementById('root')
  ); 
});
