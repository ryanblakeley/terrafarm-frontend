import React from 'react';
import {Link} from 'react-router';
import AppLogoIcon from './AppLogoIcon';
import AppLogoName from './AppLogoName';
import classNames from '../styles/AppLogoStylesheet.css';

const AppLogo = (props, context) => {
  const {router} = context;
  if (router.isActive('/', true)) {
    return <div className={classNames.this} />;
  }
  return <Link
    className={classNames.this}
    to={'/'}
    onlyActiveOnIndex
  >
    <AppLogoIcon />
    <AppLogoName />
  </Link>;
};

AppLogo.contextTypes = {
  router: React.PropTypes.object,
};

export default AppLogo;
