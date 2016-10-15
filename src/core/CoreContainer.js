/* eslint no-unused-vars: 0 */
import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TerrafarmRawTheme from '../shared/themes/terrafarm-raw-theme';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import '../shared/styles/_base.css';
import classNames from './styles/CoreContainerStylesheet.css';

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
    setUserId: PropTypes.func,
  };
  state = {
    loggedIn: false,
    idToken: null,
    userId: null,
  };
  getChildContext () {
    return {
      router: this.context.router,
      location: this.props.location,
      loggedIn: this.state.loggedIn,
      setLoggedIn: loggedIn => this.setLoggedIn(loggedIn),
      setUserId: userId => this.setUserId(userId),
    };
  }
  /* eslint react/no-did-mount-set-state: 0 */
  componentDidMount () {
    const userId = localStorage.getItem('user_uuid');
    const idToken = localStorage.getItem('id_token');
    if (userId
        && idToken
        && idToken !== window.anonymousToken
        && idToken !== window.registrarToken) {
      this.setState({ idToken, loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }
  setLoggedIn (loggedIn) {
    this.setState({ loggedIn });
  }
  setUserId (userId) {
    this.setState({ userId });
  }
  render () {
    const { children } = this.props;

    return (
      <div className={classNames.this}>
        <div className={classNames.main}>
          <AppHeader />
          {children}
        </div>
        <AppFooter />
      </div>
    );
  }
}

/* eslint new-cap: 0 */
const CoreContainerTheme = props => (
  <MuiThemeProvider muiTheme={getMuiTheme(TerrafarmRawTheme)}>
    <CoreContainer {...props} />
  </MuiThemeProvider>
);

export default CoreContainerTheme;
