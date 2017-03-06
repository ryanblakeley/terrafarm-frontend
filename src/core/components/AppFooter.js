import React from 'react';
import {AppName, Link} from 'shared/components/Typography';
import {LogoIcon} from 'shared/components/Icons';
import HelpButton from './HelpButton';
import classNames from '../styles/AppFooterStylesheet.css';

const AppFooter = () => <footer className={classNames.this}>
  <Link to={'/'}>
    <LogoIcon />
  </Link>
  <AppName className={classNames.copyright}>&copy; 2017 Terrafarm LLC</AppName>
  <HelpButton />
</footer>;

export default AppFooter;
