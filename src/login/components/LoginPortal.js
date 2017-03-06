import React from 'react';
import {FlatButton} from 'shared/components/Material';
import {LoginIcon, ArrowRightIcon} from 'shared/components/Icons';
import classNames from '../styles/LoginPortalStylesheet.css';

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
        icon={<ArrowRightIcon className={classNames.icon} />}
      />;
    } else if (loggedIn) {
      return null;
    }
    return <FlatButton
      onClick={this.handleSignIn}
      onTouchTap={this.handleSignIn}
      label={'Login'}
      icon={<LoginIcon className={classNames.icon} />}
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

    return <div>{icon}</div>;
  }
}
