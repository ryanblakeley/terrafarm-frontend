/* eslint no-unused-vars: 0 */
import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TerrafarmRawTheme from '../shared/themes/terrafarm-raw-theme';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import '../shared/styles/base.css';
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
    const idToken = localStorage.getItem('id_token');
    this.setState({ idToken });
  }
  setLoggedIn (loggedIn) {
    this.setState({ loggedIn });
  }
  setUserId (userId) {
    this.setState({ userId });
  }
  getPageName () {
    const { router } = this.context;
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

/* eslint new-cap: 0 */
const CoreContainerTheme = props => (
  <MuiThemeProvider muiTheme={getMuiTheme(TerrafarmRawTheme)}>
    <CoreContainer {...props} />
  </MuiThemeProvider>
);

export default CoreContainerTheme;
