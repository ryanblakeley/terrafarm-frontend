import 'fetch-everywhere';
import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';
import { RelayNetworkLayer, urlMiddleware } from 'react-relay-network-layer';
import TerrafarmRawTheme from 'shared/themes/terrafarm-raw-theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import headerMiddleware from './headerMiddleware';

import 'shared/styles/base.css';
import classNames from './styles/CoreContainerStylesheet.css';

const { REVERSE_PROXY_PUBLIC_IP, PORT } = process.env;

const networkAddress = REVERSE_PROXY_PUBLIC_IP === 'localhost'
  ? `${REVERSE_PROXY_PUBLIC_IP}:${PORT}`
  : REVERSE_PROXY_PUBLIC_IP;

export class CoreContainer extends Component {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.object,
  };
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };
  static childContextTypes = {
    router: PropTypes.object,
    location: PropTypes.object,
    loggedIn: PropTypes.bool,
    setLoggedIn: PropTypes.func,
    refresh: PropTypes.func,
  };
  state = {
    loggedIn: false,
    idToken: null,
  };
  getChildContext () {
    return {
      router: this.context.router,
      location: this.props.location,
      loggedIn: this.state.loggedIn,
      setLoggedIn: (loggedIn) => this.setLoggedIn(loggedIn),
      refresh: this.forceRefresh,
    };
  }
  componentWillMount () {
    this.injectAuthToken();
  }
  // It is best practice to use an underscore for arguments
  // that don't get used
  componentWillUpdate (_, nextState) {
    const { idToken } = nextState;

    if (idToken !== this.state.idToken) {
      this.injectAuthToken();
    }
  }
  getIdToken () {
    const idToken = localStorage.getItem('id_token');

    return idToken;
  }
  setLoggedIn (loggedIn) {
    this.setState({ loggedIn });
  }
  getPageName () {
    const {router} = this.context;
    let text = '';
    if (router.isActive({pathname: '/profile'})) {
      text = 'Profile';
    } else if (router.isActive({pathname: '/browse'})) {
      text = 'Browse';
    } else if (router.isActive({pathname: '/land'})) {
      text = 'Land';
    } else if (router.isActive({pathname: '/project'})) {
      text = 'Project';
    } else if (router.isActive({pathname: '/task'})) {
      text = 'Task';
    } else if (router.isActive({pathname: '/resource'})) {
      text = 'Resource';
    } else if (router.isActive({pathname: '/user'})) {
      text = 'User';
    } else if (router.isActive({pathname: '/login'})) {
      text = 'Login';
    } else {
      text = 'Terrafarm';
    }
    return text;
  }
  forceRefresh = () => {
    this.injectAuthToken();
  }
  injectAuthToken () {
    const token = this.getIdToken();

    if (token) {
      this.setState({ loggedIn: true });

      Relay.injectNetworkLayer(
        new RelayNetworkLayer([
          urlMiddleware({
            url: (req) => '/graphql'
          }),
          headerMiddleware(token)
        ])
      );
    } else {
      this.setState({ loggedIn: false });
    }
    this.setState({ idToken: token });
  }
  render () {
    const { children } = this.props;
    const pageName = this.getPageName();

    return (
      <div className={classNames.this}>
        <div className={classNames.main}>
          <AppHeader pageName={pageName} />
          {children}
        </div>
        <AppFooter />
      </div>
    );
  }
}

// I moved this down here and out of a decorator so that we can
// export a class that isn't wrapped in a theme. Wrapping it in
// a theme by default obscures a lot of things and doesn't allow
// us to properly test the component
/* eslint new-cap: 0 */
export default ThemeDecorator(
  ThemeManager.getMuiTheme(TerrafarmRawTheme)
)(CoreContainer)
