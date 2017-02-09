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
    const browseLink = <Link to={'/browse'} className={classNames.link}>Browse</Link>;
    const leftLink = !loggedIn
      ? <Link
        to={{ pathname: '/login', state: {newUser: true} }}
        className={classNames.button}
      >
        <RaisedButton label={'New User'} primary />
      </Link>
      : <Link to={'/profile'} className={classNames.button}>
        <RaisedButton label={'Profile'} primary />
      </Link>;
    const rightLink = !loggedIn
      ? <Link to={'/login'} className={classNames.button}>
        <RaisedButton label={'Login'} />
      </Link>
      : <RaisedButton
        label={'Logout'}
        onTouchTap={this.handleSignOut}
        className={classNames.button}
      />;

    return <div className={classNames.this}>
      {leftLink}
      {rightLink}
      {!loggedIn && <p className={classNames.text}>
        Just looking around? {browseLink} farms and products.
      </p>}
    </div>;
  }
}

export default LoginLinks;
