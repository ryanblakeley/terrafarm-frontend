import React from 'react';
import classnames from 'classnames/bind';
import {LogoIcon} from 'shared/components/Icons';
import classNamesContext from '../styles/AppLogoIconStylesheet.css';

const cx = classnames.bind(classNamesContext);

const AppLogoIcon = (props, context) => <div className={cx({this: true})}>
  <LogoIcon
    className={cx({icon: true, faded: !context.loggedIn})}
    width={52}
    height={52}
  />
</div>;

AppLogoIcon.contextTypes = {
  loggedIn: React.PropTypes.bool,
};

export default AppLogoIcon;
