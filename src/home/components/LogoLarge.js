import React from 'react';
// import LogoIcon from 'shared/components/LogoIcon';
// import logoName from 'core/components/logo_name.png';
import logoFull from 'core/components/logo_full_xlarge.png';
import classNames from '../styles/LogoLargeStylesheet.css';

const LogoLarge = props => <div className={classNames.this} >
  {/*
  <LogoIcon
    className={classNames.icon}
    width={90} height={90}
  />
*/}
  <h1 className={classNames.appTitle}>
    <img src={logoFull} className={classNames.logoImage} alt={'Terrafarm'} />
  </h1>
</div>;

export default LogoLarge;
