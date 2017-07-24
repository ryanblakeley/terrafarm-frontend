import React from 'react';
import { H1, Link } from 'shared/components/Typography';
import { LogoIcon, LogoNameIcon } from 'shared/components/Icons';
import classnamesContext from 'classnames/bind';
import classNames from '../styles/AppLogoStylesheet.css';

const cx = classnamesContext.bind(classNames);

const AppLogoIcon = () => <div className={cx({ logoIcon: true })}>
  <LogoIcon
    className={cx({ icon: true })}
    width={52}
    height={52}
  />
</div>;

const AppLogoName = () => <div className={cx({ logoName: true })}>
  <H1 className={cx({ appTitle: true })}>
    <LogoNameIcon width={120} height={'auto'} />
  </H1>
</div>;

const AppLogo = props => <Link
  className={cx({ this: true })}
  to={'/'}
  activeClassName={classNames.active}
  exact
>
  <AppLogoIcon />
  <AppLogoName />
</Link>;

export default AppLogo;
