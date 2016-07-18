import React from 'react';
import LogoIcon from '../../shared/components/LogoIcon';

import classnames from 'classnames/bind';
import classNamesContext from '../styles/AppLogoIconStylesheet.css';
const cx = classnames.bind(classNamesContext);

export default class AppLogoIcon extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    loggedIn: React.PropTypes.bool,
  };
  getIcon () {
    const {loggedIn} = this.context;

    return <LogoIcon
      className={cx({icon: true, faded: !loggedIn})}
      width={52} height={52}
    />;
  }
  handleProfile = () => {
    const {router, loggedIn} = this.context;

    if (loggedIn) {
      router.push('/profile');
    }
  }
  render () {
    const icon = this.getIcon();

    return <div className={cx({this: true})} onClick={this.handleProfile}>
      {icon}
    </div>;
  }
}
