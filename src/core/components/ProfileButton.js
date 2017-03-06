import React from 'react';
import {FlatButton} from 'shared/components/Material';
import {PersonIcon} from 'shared/components/Icons';
import classNames from '../styles/ProfileButtonStylesheet.css';

export default class ProfileButton extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    loggedIn: React.PropTypes.bool,
  };
  handleClick = () => {
    const {router} = this.context;

    router.push('/profile');
  }
  render () {
    const {router, loggedIn} = this.context;
    const enabled = loggedIn && !router.isActive('profile');

    if (enabled) {
      return <FlatButton
        onClick={this.handleClick}
        onTouchTap={this.handleClick}
        label={'Profile'}
        icon={<PersonIcon className={classNames.icon} />}
      />;
    }
    return null;
  }
}
