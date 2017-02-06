// Vendor
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IoLogIn from 'react-icons/lib/io/log-in';
import IoIosArrowThinRight from 'react-icons/lib/io/ios-arrow-thin-right';
import classnames from 'classnames/bind';
import classNamesContext from '../styles/LoginPortalStylesheet.css';

const cx = classnames.bind(classNamesContext);

export default class LoginPortal extends React.Component {
  static contextTypes = {
    loggedIn: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
    setLoggedIn: React.PropTypes.func.isRequired,
  };
  getIcon () {
    const { loggedIn, router } = this.context;

    if (loggedIn && router.isActive('profile')) {
      return <FlatButton
        onClick={this.handleSignOut}
        onTouchTap={this.handleSignOut}
        label={'Logout'}
        className={cx({button: true})}
        icon={<IoIosArrowThinRight
          style={{color: ''}}
          className={classNamesContext.icon}
        />}
      />;
    } else if (loggedIn) {
      return null;
    }
    return <FlatButton
      onClick={this.handleSignIn}
      onTouchTap={this.handleSignIn}
      label={'Login'}
      className={cx({button: true})}
      icon={<IoLogIn style={{color: ''}} className={cx({icon: true})} />}
      disabled={router.isActive('login')}
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

    return <div className={classNamesContext.this}>
      {icon}
    </div>;
  }
}
