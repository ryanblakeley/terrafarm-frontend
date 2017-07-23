import React from 'react';
import Layout from 'shared/components/Layout';
import AppLogo from './AppLogo';
import classNames from '../styles/AppHeaderStylesheet.css';

const AppHeader = () => <Layout page className={classNames.this} >
  <AppLogo />
</Layout>;

export default AppHeader;
