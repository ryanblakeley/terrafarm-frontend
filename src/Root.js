import React from 'react';
import Relay from 'react-relay/classic';
import {
  Router,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router';
import useRelay from 'react-router-relay';
import ReactGA from 'react-ga';
import networkLayer from 'shared/utils/networkLayer';
import routes from './routes';

class Root extends React.Component {
  static childContextTypes = {
    logout: React.PropTypes.func,
    relayEnvironment: React.PropTypes.object,
  };
  state = {
    environment: null,
  };
  getChildContext () {
    return {
      logout: _ => this.logout(),
      relayEnvironment: this.state.environment,
    };
  }
  componentWillMount () {
    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_KEY);
    const environment = new Relay.Environment();
    environment.injectNetworkLayer(networkLayer);
    this.setState({environment});
  }
  logout () {
    const environment = new Relay.Environment();
    environment.injectNetworkLayer(networkLayer);
    this.setState({environment});
  }
  logPageView = _ => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
  render () {
    return <Router
      render={applyRouterMiddleware(useRelay)}
      history={browserHistory}
      environment={this.state.environment}
      routes={routes}
      onUpdate={this.logPageView}
      key={Math.random()}
    />;
  }
}

export default Root;
