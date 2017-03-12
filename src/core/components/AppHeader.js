import React from 'react';
import Layout from 'shared/components/Layout';
import AppLogo from './AppLogo';
import AppHeaderButtons from './AppHeaderButtons';
import classNames from '../styles/AppHeaderStylesheet.css';

const AppHeader = _ => <Layout page className={classNames.this} >
  <AppLogo />
  <AppHeaderButtons />
</Layout>;

export default AppHeader;
