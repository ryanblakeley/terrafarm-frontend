// Vendor
import React from 'react';
import IconButton from 'material-ui/IconButton';
import {red200, blue500} from 'material-ui/styles/colors';
import IoLogIn from 'react-icons/lib/io/log-in';
import IoLogOut from 'react-icons/lib/io/log-out';
import classNames from 'classnames/bind';

// Styles
import classNamesContext from '../styles/LoginPortalStylesheet.css';

const cx = classNames.bind(classNamesContext);
const styles = {
  medium: { width: 58, height: 58 },
  small: { padding: 6, width: 36, height: 36 },
  icon: { color: '' },
};

export default class LoginPortal extends React.Component {
  static contextTypes = {
    loggedIn: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
    setLoggedIn: React.PropTypes.func.isRequired,
  };
  getIcon () {
    const { loggedIn } = this.context;

    styles.icon.color = loggedIn ? red200 : blue500;

    if (loggedIn) {
      return <IconButton
        style={styles.small}
        iconStyle={styles.icon}
        onClick={this.handleSignOut}
        onTouchTap={this.handleSignOut}
        touch
      >
        <IoLogOut className={cx({icon: true, small: true})} />
      </IconButton>;
    }
    return <IconButton
      style={styles.medium}
      iconStyle={styles.icon}
      onClick={this.handleSignIn}
      onTouchTap={this.handleSignIn}
      touch
    >
      <IoLogIn className={cx({icon: true, medium: true})} />
    </IconButton>;
  }
  handleSignIn = () => {
    const { router } = this.context;

    if (!router.isActive('/login')) {
      router.push('/login');
    }
  }
  handleSignOut = () => {
    const { router, setLoggedIn } = this.context;
    localStorage.setItem('id_token', window.anonymousToken);
    localStorage.removeItem('user_uuid');
    setLoggedIn(false);
    console.log('portal sign out');
    router.push('/');
  }
  render () {
    const icon = this.getIcon();

    return <div className={cx({this: true})}>
      {icon}
    </div>;
  }
}
