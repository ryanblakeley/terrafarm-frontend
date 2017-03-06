import React from 'react';
import {H1} from 'shared/components/Typography';
import {LogoNameIcon} from 'shared/components/Icons';
import classNames from '../styles/AppLogoNameStylesheet.css';

const AppLogoName = _ => <div className={classNames.this}>
  <H1 className={classNames.appTitle}>
    <LogoNameIcon width={120} height={'auto'} />
  </H1>
</div>;

export default AppLogoName;
