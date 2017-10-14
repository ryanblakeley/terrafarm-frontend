import PropTypes from 'prop-types';
import React from 'react';
import { MuiThemeProvider, getMuiTheme } from 'shared/components/Material';
import terrafarmRawTheme from 'tools/terrafarmRawTheme';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Banner from './Banner';
import classNames from '../styles/CorePageStylesheet.css';

const propTypes = {
  children: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

class CorePageComponent extends React.Component {
  static childContextTypes = {
    loggedIn: PropTypes.bool,
    setLoggedIn: PropTypes.func,
    // userId: PropTypes.string,
    // setUserId: PropTypes.func,
  };
  state = {
    loggedIn: false,
    // userId: null,
    idToken: null,
  };
  getChildContext () {
    return {
      loggedIn: this.state.loggedIn,
      setLoggedIn: loggedIn => this.setLoggedIn(loggedIn),
      // userId: this.state.userId,
      // setUserId: userId => this.setUserId(userId),
    };
  }
  componentWillMount () {
    // const userId = localStorage.getItem('user_uuid');
    const idToken = localStorage.getItem('id_token');
    if (idToken
        && idToken !== window.anonymousToken
        && idToken !== window.authenticatorToken) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }
  setLoggedIn (loggedIn) {
    this.setState({ loggedIn });
  }
  /*
  setUserId (userId) {
    this.setState({ userId });
  }
  */
  render () {
    const { match, router } = this.props;

    return <div className={classNames.this} >
      <div className={classNames.main} >
        <Banner />
        <AppHeader match={match} router={router} />
        {this.props.children}
      </div>
      <AppFooter />
    </div>;
  }
}

CorePageComponent.propTypes = propTypes;

/* eslint-disable new-cap */
export const CorePage = props => (
  <MuiThemeProvider muiTheme={getMuiTheme(terrafarmRawTheme)}>
    <CorePageComponent {...props} />
  </MuiThemeProvider>
);
