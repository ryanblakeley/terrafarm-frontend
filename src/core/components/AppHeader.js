import React from 'react';
import AppLogo from './AppLogo';
import AppHeaderNav from './AppHeaderNav';
import classNames from '../styles/AppHeaderStylesheet.css';

const AppHeader = _ => <div className={classNames.this} >
  <AppLogo />
  <AppHeaderNav />
</div>;

export default AppHeader;
