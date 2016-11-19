// Vendor
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IoLogIn from 'react-icons/lib/io/log-in';
import IoIosArrowThinRight from 'react-icons/lib/io/ios-arrow-thin-right';
import classNames from '../styles/LoginPortalStylesheet.css';

export default class LoginPortal extends React.Component {
  static contextTypes = {
    loggedIn: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
    setLoggedIn: React.PropTypes.func.isRequired,
  };
  getIcon () {
    const { loggedIn, router } = this.context;
    const disabled = router.isActive('login');

    if (loggedIn) {
      return <FlatButton
        onClick={this.handleSignOut}
        onTouchTap={this.handleSignOut}
        label={'Logout'}
        className={classNames.button}
        icon={<IoIosArrowThinRight style={{color: ''}} className={classNames.icon} />}
        disabled={disabled}
      />;
    }
    return <FlatButton
      onClick={this.handleSignIn}
      onTouchTap={this.handleSignIn}
      label={'Login'}
      className={classNames.button}
      icon={<IoLogIn style={{color: ''}} className={classNames.icon} />}
      disabled={disabled}
    />;
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
    router.push('/');
  }
  render () {
    const icon = this.getIcon();

    return <div className={classNames.this}>
      {icon}
    </div>;
  }
}
