import React from 'react';
import LoginPortal from 'login/components/LoginPortal';
import ProfileButton from './ProfileButton';
import BrowseButton from './BrowseButton';

import classNames from '../styles/AppHeaderNavStylesheet.css';

const AppHeaderNav = _ => <div className={classNames.this} >
  <BrowseButton />
  <ProfileButton />
  <LoginPortal />
</div>;

export default AppHeaderNav;
