// Vendor
/* eslint no-unused-vars: 0 */
import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';

// Theme
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import TerrafarmRawTheme from '../shared/themes/terrafarm-raw-theme';

// Local
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

// Styles
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
      setLoggedIn: loggedIn => this.setLoggedIn(loggedIn),
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
export default ThemeDecorator(
  ThemeManager.getMuiTheme(TerrafarmRawTheme)
)(CoreContainer);
