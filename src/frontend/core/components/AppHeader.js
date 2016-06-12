import React from 'react';
import AppLogo from './AppLogo';
import Nav from './Nav';

import classnames from 'classnames/bind';
import classNamesContext from '../styles/AppHeaderStylesheet.css';
const cx = classnames.bind(classNamesContext);

class AppHeader extends React.Component {
  render () {
    const {router} = this.context;
    let text = '';
    if (router.isActive({pathname: '/profile'})) {
      text = 'Profile';
    } else if (router.isActive({pathname: '/browse'})) {
      text = 'Browse';
    } else if (router.isActive({pathname: '/land'})) {
      text = 'Land';
    } else if (router.isActive({pathname: '/project'})) {
      text = 'Project';
    } else if (router.isActive({pathname: '/task'})) {
      text = 'Task';
    } else if (router.isActive({pathname: '/resource'})) {
      text = 'Resource';
    } else if (router.isActive({pathname: '/user'})) {
      text = 'User';
    } else if (router.isActive({pathname: '/login'})) {
      text = 'Login';
    } else {
      text = 'Terrafarm';
    }

    return <div
      className={cx({
        this: true,
        home: text === 'Terrafarm',
      })}
    >
      <AppLogo outline text={text} />
      <Nav />
    </div>;
  }
}

AppHeader.contextTypes = {
  router: React.PropTypes.object,
};

export default AppHeader;
