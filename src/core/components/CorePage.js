import React, { PropTypes, Component } from 'react';
import {MuiThemeProvider, getMuiTheme} from 'shared/components/Material';
import TerrafarmRawTheme from 'shared/utils/terrafarm-raw-theme';
import 'shared/styles/_base.css'; // puts base styles directly into the HTML document
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Banner from './Banner';
import classNames from '../styles/CorePageStylesheet.css';

export class CorePage extends Component {
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
    userId: PropTypes.string,
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
      userId: this.state.userId,
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
        && idToken !== window.authenticatorToken) {
      this.setState({ loggedIn: true, userId });
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
          <Banner />
          <AppHeader />
          {children}
        </div>
        <AppFooter />
      </div>
    );
  }
}

/* eslint-disable new-cap */
const CorePageTheme = props => (
  <MuiThemeProvider muiTheme={getMuiTheme(TerrafarmRawTheme)}>
    <CorePage {...props} />
  </MuiThemeProvider>
);

export default CorePageTheme;
