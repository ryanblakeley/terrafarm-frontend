import React from 'react';
import logoName from './logo_name.png';
import classNames from '../styles/AppLogoNameStylesheet.css';

const AppLogoName = (props) => <div className={classNames.this}>
  <h1 className={classNames.appTitle}>
    <img src={logoName} className={classNames.logoImage} alt={'Terrafarm'} />
  </h1>
</div>;

export default AppLogoName;
