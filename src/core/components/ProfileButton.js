import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IoIosPerson from 'react-icons/lib/io/ios-person';
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
      return <div className={classNames.this}>
        <FlatButton
          onClick={this.handleClick}
          onTouchTap={this.handleClick}
          label={'Profile'}
          className={classNames.button}
          icon={<IoIosPerson style={{color: ''}} className={classNames.icon} />}
        />
      </div>;
    }
    return null;
  }
}
