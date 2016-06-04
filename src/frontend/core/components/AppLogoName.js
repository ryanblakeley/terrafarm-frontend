import React from 'react';

import classNames from '../styles/AppLogoNameStylesheet.css';

const AppLogoName = (props) => <div className={classNames.this}>
  <h1 className={classNames.appTitle}>{props.pageHeading}</h1>
</div>;

export default AppLogoName;
