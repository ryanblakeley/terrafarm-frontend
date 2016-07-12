import React from 'react';
import Relay from 'react-relay';
import TerrafarmRawTheme from '../shared/themes/terrafarm-raw-theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

import '../shared/styles/base.css';
import classNames from './styles/CoreContainerStylesheet.css';

const { PUBLIC_IP, FRONTEND_PORT } = process.env;

const networkAddress = PUBLIC_IP === 'localhost'
  ? `${PUBLIC_IP}:${FRONTEND_PORT}`
  : PUBLIC_IP;

/* eslint new-cap: 0 */
@ThemeDecorator(ThemeManager.getMuiTheme(TerrafarmRawTheme))
export default class CoreContainer extends React.Component {
  static propTypes = {
    location: React.PropTypes.object,
    children: React.PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };
  static childContextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object,
    loggedIn: React.PropTypes.bool,
    setLoggedIn: React.PropTypes.func,
    refresh: React.PropTypes.func,
  };
  state ={
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
  componentWillUpdate (nextProps, nextState) {
    const {idToken} = nextState;

    if (idToken !== this.state.idToken) {
      this.injectAuthToken();
    }
  }
  getIdToken () {
    const idToken = localStorage.getItem('id_token');

    return idToken;
  }
  setLoggedIn (loggedIn) {
    this.setState({loggedIn});
  }
  forceRefresh = () => {
    this.injectAuthToken();
  }
  injectAuthToken () {
    const token = this.getIdToken();

    if (token) {
      this.setState({loggedIn: true});

      Relay.injectNetworkLayer(
        new Relay.DefaultNetworkLayer(`http://${networkAddress}/graphql`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
    } else {
      this.setState({loggedIn: false});
    }
    this.setState({idToken: token});
  }
  render () {
    const {children} = this.props;

    return <div className={classNames.this} >
      <div className={classNames.main} >
        <AppHeader />
        {children}
      </div>
      <AppFooter />
    </div>;
  }
}
