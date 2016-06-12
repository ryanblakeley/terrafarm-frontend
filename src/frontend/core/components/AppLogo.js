import React from 'react';
import AppLogoIcon from './AppLogoIcon';
import AppLogoName from './AppLogoName';
import PageHeading from './PageHeading';

import classNames from 'classnames/bind';
import classNamesContext from '../styles/AppLogoStylesheet.css';
const cx = classNames.bind(classNamesContext);

const AppLogo = (props) => <div
  className={cx({this: true, stacked: props.stacked})}
>
  <AppLogoIcon outline={props.outline} />
  {props.text === 'Terrafarm'
    ? <AppLogoName />
    : <PageHeading text={props.text} />
  }
</div>;

AppLogo.propTypes = {
  stacked: React.PropTypes.bool,
  outline: React.PropTypes.bool,
  text: React.PropTypes.string,
};

AppLogo.defaultProps = {
  stacked: false,
  outline: false,
};

export default AppLogo;
