import React from 'react';

import classNames from '../styles/AppLogoNameStylesheet.css';

const AppLogoName = (props) => <div className={classNames.this}>
  <h1 className={classNames.appTitle}>{props.text}</h1>
</div>;

AppLogoName.propTypes = {
  text: React.PropTypes.string,
};

AppLogoName.defaultProps = {
  text: 'Terrafarm',
};

export default AppLogoName;
