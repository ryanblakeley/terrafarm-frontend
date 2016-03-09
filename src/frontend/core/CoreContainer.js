import React from 'react';
import Relay from 'react-relay';
import TerrafarmRawTheme from '../shared/themes/terrafarm-raw-theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import Perspective from './components/Perspective';

import '../shared/styles/base.css';

const { PUBLIC_IP, FRONTEND_PORT, AUTH0_CLIENT_ID, AUTH0_DOMAIN } = process.env;

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
    lock: React.PropTypes.object,
    idToken: React.PropTypes.string,
    refresh: React.PropTypes.func,
  };
  state ={
    loggedIn: false,
  };
  getChildContext () {
    return {
      router: this.context.router,
      location: this.props.location,
      loggedIn: this.state.loggedIn,
      lock: this.lock,
      idToken: this.state.idToken,
      refresh: this.forceRefresh,
    };
  }
  componentWillMount () {
    this.lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

    this.injectAuthToken();
  }
  injectAuthToken () {
    const token = this.getIdToken();

    if (token) {
      this.setState({loggedIn: true});

      Relay.injectNetworkLayer(
        new Relay.DefaultNetworkLayer(`http://${networkAddress}/graphql`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
      );
    } else {
      this.setState({loggedIn: false});
    }
    this.setState({idToken: token});
  }
  getIdToken () {
    let idToken = localStorage.getItem('id_token');
    const authHash = this.lock.parseHash(window.location.hash);

    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('id_token', authHash.id_token);
      }
      if (authHash.error) {
        console.log('Error signing in', authHash);
        return null;
      }
    }

    return idToken;
  }
  forceRefresh = () => {
    this.injectAuthToken();
  }
  render () {
    return <Perspective children={this.props.children} />;
  }
}
