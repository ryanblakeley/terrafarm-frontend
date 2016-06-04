import React from 'react';
import LoginPortal from './LoginPortal';
import BrowseButton from './BrowseButton';

import classNames from '../styles/NavStylesheet.css';

const Nav = () => <div className={classNames.this} >
  <BrowseButton />
  <LoginPortal />
</div>;

export default Nav;
