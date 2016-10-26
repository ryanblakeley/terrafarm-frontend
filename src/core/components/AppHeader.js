import React from 'react';
import classnames from 'classnames/bind';
import AppLogo from './AppLogo';
import AppHeaderNav from './AppHeaderNav';
import classNamesContext from '../styles/AppHeaderStylesheet.css';

const cx = classnames.bind(classNamesContext);

const AppHeader = (props, context) => <div
  className={cx({
    this: true,
    home: context.router.isActive('/', true),
  })}
>
  <AppLogo />
  <AppHeaderNav />
</div>;

AppHeader.contextTypes = {
  router: React.PropTypes.object,
};

export default AppHeader;
