import React from 'react';
import {Link} from 'react-router';
import logoImage from './logo_icon.png';
import HelpButton from './HelpButton';
import classNames from '../styles/AppFooterStylesheet.css';

const AppFooter = () => <footer className={classNames.this}>
  <Link
    to={'/'}
    className={classNames.link}
  >
    <img src={logoImage} className={classNames.logoImage} alt={'Terrafarm'} />
  </Link>
  <HelpButton />
  <h6 className={classNames.text}>&copy; 2017 Terrafarm LLC</h6>
</footer>;

export default AppFooter;
