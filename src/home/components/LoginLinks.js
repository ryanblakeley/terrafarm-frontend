import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import classNames from '../styles/LoginLinksStylesheet.css';

class LoginLinks extends React.Component {
  static contextTypes = {
    loggedIn: React.PropTypes.bool,
    setLoggedIn: React.PropTypes.func,
    router: React.PropTypes.object,
  };
  handleSignOut = () => {
    const { router, setLoggedIn } = this.context;
    localStorage.setItem('id_token', window.anonymousToken);
    localStorage.removeItem('user_uuid');
    setLoggedIn(false);
    router.push('/');
  }
  render () {
    const {loggedIn} = this.context;
    const link1 = !loggedIn
      ? <Link to={'/login'} className={classNames.link}>
        <RaisedButton label={'Login'} primary className={classNames.button} />
      </Link>
      : <Link to={'/profile'} className={classNames.link}>
        <RaisedButton label={'Profile'} primary className={classNames.button} />
      </Link>;

    const link2 = !loggedIn
      ? <Link to={{ pathname: '/login', state: {newUser: true} }} >
        <RaisedButton label={'New User'} className={classNames.button} />
      </Link>
      : <RaisedButton
        label={'Logout'}
        className={classNames.button}
        onTouchTap={this.handleSignOut}
      />;

    return <div className={classNames.this}>
      {link1}
      {link2}
    </div>;
  }
}

export default LoginLinks;
