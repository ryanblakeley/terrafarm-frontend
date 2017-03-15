import React from 'react';
import {FlatButton} from 'shared/components/Material';
import {CrosshairIcon, PersonIcon, LoginIcon, ArrowRightIcon} from 'shared/components/Icons';
import {Link} from 'shared/components/Typography';
import classNames from '../styles/AppHeaderButtonsStylesheet.css';

function handleSignout (setLoggedIn, replace) {
  localStorage.setItem('id_token', window.anonymousToken);
  localStorage.removeItem('user_uuid');
  setLoggedIn(false);
  replace('/');
}

const BrowseButton = (props, context) => <Link
  to={'/browse'}
  disabled={context.router.isActive('browse')}
>
  <FlatButton
    label={'Browse'}
    icon={<CrosshairIcon />}
    disabled={context.router.isActive('browse')}
  />
</Link>;

const ProfileButton = (props, context) => <Link
  to={'/profile'}
  disabled={!context.loggedIn || context.router.isActive('profile')}
>
  <FlatButton
    label={'Profile'}
    icon={<PersonIcon />}
    disabled={!context.loggedIn || context.router.isActive('profile')}
  />
</Link>;

const LogoutButton = (props, context) => <FlatButton
  onClick={_ => {
    context.logout();
    handleSignout(context.setLoggedIn, context.router.replace);
  }}
  onTouchTap={_ => {
    context.logout();
    handleSignout(context.setLoggedIn, context.router.replace);
  }}
  label={'Logout'}
  icon={<ArrowRightIcon />}
  disabled={!context.loggedIn || !context.router.isActive('profile')}
/>;

const LoginButton = (props, context) => <Link
  to={'/login'}
  disabled={context.loggedIn || context.router.isActive('login')}
>
  <FlatButton
    label={'Login'}
    icon={<LoginIcon />}
    disabled={context.loggedIn || context.router.isActive('login')}
  />
</Link>;

const AppHeaderButtons = (props, context) => <div className={classNames.this} >
  {context.router.isActive('browse') || <BrowseButton />}
  {(!context.loggedIn || context.router.isActive('profile')) || <ProfileButton />}
  {(!context.loggedIn || !context.router.isActive('profile')) || <LogoutButton />}
  {(context.loggedIn || context.router.isActive('login')) || <LoginButton />}
</div>;

const commonContextTypes = {
  router: React.PropTypes.object.isRequired,
  loggedIn: React.PropTypes.bool,
};

BrowseButton.contextTypes = commonContextTypes;
ProfileButton.contextTypes = commonContextTypes;
LogoutButton.contextTypes = Object.assign(commonContextTypes, {
  setLoggedIn: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
});
LoginButton.contextTypes = commonContextTypes;
AppHeaderButtons.contextTypes = commonContextTypes;

export default AppHeaderButtons;
