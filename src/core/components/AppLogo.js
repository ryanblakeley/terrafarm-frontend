import React from 'react';
import { H1, Link } from 'shared/components/Typography';
import { LogoIcon, LogoNameIcon } from 'shared/components/Icons';
import classnames from 'classnames/bind';
import classNamesContext from '../styles/AppLogoStylesheet.css';

const cx = classnames.bind(classNamesContext);

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

const AppLogo = () => <Link
  className={cx({ this: true })}
  to={'/'}
>
  <AppLogoIcon />
  <AppLogoName />
</Link>;

export default AppLogo;
