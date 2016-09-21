import React from 'react';
import LoginPortal from '../../login/components/LoginPortal';
import BrowseButton from './BrowseButton';

import classNames from '../styles/AppHeaderNavStylesheet.css';

const AppHeaderNav = () => <div className={classNames.this} >
  <BrowseButton />
  <LoginPortal />
</div>;

export default AppHeaderNav;
