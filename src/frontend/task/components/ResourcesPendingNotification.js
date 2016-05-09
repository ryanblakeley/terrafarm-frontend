import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import MdNotifications from 'react-icons/lib/md/notifications';

import classNames from '../styles/ResourcesPendingNotificationStylesheet.css';

export default class ResourcesPendingNotification extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
  };
  handleTouchTap = () => {
    const {onClick} = this.props;

    if (onClick) {
      this.props.onClick();
    }
  }
  render () {
    return <IconButton
      className={classNames.this}
      onTouchTap={this.handleTouchTap}
    >
      <MdNotifications className={classNames.icon} />
    </IconButton>;
  }
}
