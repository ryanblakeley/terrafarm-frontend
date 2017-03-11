import React from 'react';
import {H1, Link} from 'shared/components/Typography';
import {LogoIcon, LogoNameIcon} from 'shared/components/Icons';
import classnames from 'classnames/bind';
import classNamesContext from '../styles/AppLogoStylesheet.css';

const cx = classnames.bind(classNamesContext);

const AppLogoIcon = (props, context) => <div className={cx({logoIcon: true})}>
  <LogoIcon
    className={cx({icon: true, faded: !context.loggedIn})}
    width={52}
    height={52}
  />
</div>;

const AppLogoName = _ => <div className={cx({logoName: true})}>
  <H1 className={cx({appTitle: true})}>
    <LogoNameIcon width={120} height={'auto'} />
  </H1>
</div>;

const AppLogo = (props, context) => {
  const {router} = context;
  if (router.isActive('/', true)) {
    return <div className={cx({this: true})} />;
  }
  return <Link
    className={cx({this: true})}
    to={'/'}
    onlyActiveOnIndex
  >
    <AppLogoIcon />
    <AppLogoName />
  </Link>;
};

AppLogoIcon.contextTypes = {
  loggedIn: React.PropTypes.bool,
};
AppLogo.contextTypes = {
  router: React.PropTypes.object,
};

export default AppLogo;
