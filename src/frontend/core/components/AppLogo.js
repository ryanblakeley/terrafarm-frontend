import React from 'react';
import AppLogoIcon from './AppLogoIcon';
import AppLogoName from './AppLogoName';

import classNames from 'classnames/bind';
import classNamesContext from '../styles/AppLogoStylesheet.css';
const cx = classNames.bind(classNamesContext);
/* eslint react/prefer-stateless-function: 0 */
class AppLogo extends React.Component {
  static propTypes = {
    stacked: React.PropTypes.bool,
    outline: React.PropTypes.bool,
    pageHeading: React.PropTypes.string,
  };
  render () {
    const {stacked, outline, pageHeading} = this.props;

    return <div className={cx({this: true, stacked})}>
      <AppLogoIcon outline={outline} />
      <AppLogoName pageHeading={pageHeading} />
    </div>;
  }
}
export default AppLogo;

