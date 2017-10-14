import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton } from 'shared/components/Material';
import { PersonIcon, LoginIcon, ArrowRightIcon } from 'shared/components/Icons';
import { Link } from 'shared/components/Typography';
import classNames from '../styles/AppHeaderButtonsStylesheet.css';

const propTypes = {
  router: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const contextTypes = {
  loggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func,
};

function handleSignout (setLoggedIn, replace) {
  localStorage.setItem('id_token', window.anonymousToken);
  // localStorage.removeItem('user_uuid');
  setLoggedIn(false);
  replace('/');
}

const AppHeaderButtons = (props, context) => {
  const { match, router } = props;
  const showProfileButton = context.loggedIn && !router.isActive(match, { pathname: '/profile' });
  const showLogoutButton = context.loggedIn;
  const showLoginButton = !context.loggedIn && !router.isActive(match, { pathname: '/login' });

  const ProfileButton = () => <Link to={'/profile'} >
    <FlatButton label={'Profile'} icon={<PersonIcon />} />
  </Link>;

  const LoginButton = () => <Link to={'/login'} >
    <FlatButton label={'Login'} icon={<LoginIcon />} />
  </Link>;

  const LogoutButton = () => <FlatButton
    onClick={() => { handleSignout(context.setLoggedIn, props.router.replace); }}
    onTouchTap={() => { handleSignout(context.setLoggedIn, props.router.replace); }}
    label={'Logout'}
    icon={<ArrowRightIcon />}
  />;

  return <div className={classNames.this} >
    {showProfileButton && <ProfileButton />}
    {showLogoutButton && <LogoutButton router={router} />}
    {showLoginButton && <LoginButton />}
  </div>;
};

AppHeaderButtons.propTypes = propTypes;
AppHeaderButtons.contextTypes = contextTypes;

export default AppHeaderButtons;
/*
const BrowseButton = (props, context) => <Link
  to={'/food'}
  disabled={context.router.isActive('food')}
  className={cx({
    hideSmall: !context.router.isActive('/', true)
      && !context.router.isActive('login'),
  })}
>
  <FlatButton
    label={'Browse'}
    icon={<CrosshairIcon />}
    disabled={context.router.isActive('browse')}
  />
</Link>;
*/
