import React from 'react';
import classnames from 'classnames/bind';
import AppLogo from './AppLogo';
import AppHeaderNav from './AppHeaderNav';
import classNamesContext from '../styles/AppHeaderStylesheet.css';

const cx = classnames.bind(classNamesContext);

const AppHeader = props => <div className={cx({this: true, home: true})}>
  <AppLogo />
  <AppHeaderNav />
</div>;

export default AppHeader;
