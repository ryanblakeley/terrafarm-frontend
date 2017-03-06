import React from 'react';
import {AppName} from 'shared/components/Typography';
import {LogoFullIcon} from 'shared/components/Icons';
import classNames from '../styles/LogoLargeStylesheet.css';

const LogoLarge = props => <AppName className={classNames.appName}>
  <LogoFullIcon className={classNames.logoImage} />
</AppName>;

export default LogoLarge;
