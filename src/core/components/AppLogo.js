import React from 'react';
import classNames from 'classnames/bind';
import AppLogoIcon from './AppLogoIcon';
import AppLogoName from './AppLogoName';
import PageHeading from './PageHeading';
import classNamesContext from '../styles/AppLogoStylesheet.css';

const cx = classNames.bind(classNamesContext);

const AppLogo = (props, context) => <div
  className={cx({this: true, stacked: props.stacked})}
>
  <AppLogoIcon />
  {context.location.pathname === '/'
    ? <AppLogoName />
    : <PageHeading
      text={context.location.pathname.split('/')[1].toUpperCase()}
    />
  }
</div>;

AppLogo.propTypes = {
  stacked: React.PropTypes.bool,
  text: React.PropTypes.string,
};

AppLogo.defaultProps = {
  stacked: false,
};

AppLogo.contextTypes = {
  location: React.PropTypes.object,
};

export default AppLogo;
