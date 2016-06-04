import React from 'react';
import AppLogo from './AppLogo';
import Nav from './Nav';

import classNames from '../styles/AppHeaderStylesheet.css';
/* eslint react/prefer-stateless-function: 0 */
export default class AppHeader extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };
  render () {
    const {router} = this.context;
    let pageHeading = 'Terrafarm';
    if (router.isActive({pathname: '/profile'})) {
      pageHeading = 'Profile';
    } else if (router.isActive({pathname: '/browse'})) {
      pageHeading = 'Browse';
    } else if (router.isActive({pathname: '/land'})) {
      pageHeading = 'Land';
    } else if (router.isActive({pathname: '/project'})) {
      pageHeading = 'Project';
    } else if (router.isActive({pathname: '/task'})) {
      pageHeading = 'Task';
    } else if (router.isActive({pathname: '/resource'})) {
      pageHeading = 'Resource';
    } else if (router.isActive({pathname: '/user'})) {
      pageHeading = 'User';
    }

    return <div className={classNames.this} >
      <AppLogo outline pageHeading={pageHeading} />
      <Nav />
    </div>;
  }
}
