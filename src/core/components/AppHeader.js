import React from 'react';
import AppLogo from './AppLogo';
import AppHeaderButtons from './AppHeaderButtons';
import classNames from '../styles/AppHeaderStylesheet.css';

const AppHeader = _ => <div className={classNames.this} >
  <AppLogo />
  <AppHeaderButtons />
</div>;

export default AppHeader;
