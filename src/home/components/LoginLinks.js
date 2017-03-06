import React from 'react';
import {Link} from 'shared/components/Typography';
import {RaisedButton, FlatButton} from 'shared/components/Material';
import classNames from '../styles/LoginLinksStylesheet.css';

const browseLink = <Link to={'/browse'}>
  <FlatButton label={'Browse Farms'} fullWidth smallTop secondary />
</Link>;

const newUserLink = <Link to={{ pathname: '/login', state: {newUser: true} }}>
  <RaisedButton label={'New User'} primary smallRight />
</Link>;

const profileLink = <Link to={'/profile'}>
  <RaisedButton label={'Profile'} primary smallRight />
</Link>;

const loginLink = <Link to={'/login'}>
  <RaisedButton label={'Login'} />
</Link>;

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
    const leftLink = !loggedIn ? newUserLink : profileLink;
    const rightLink = !loggedIn ? loginLink : <RaisedButton
      label={'Logout'}
      onTouchTap={this.handleSignOut}
    />;

    return <div className={classNames.this}>
      {leftLink}
      {rightLink}
      {!loggedIn && browseLink}
    </div>;
  }
}
export default LoginLinks;
