import React from 'react';
import IconButton from 'material-ui/IconButton';
import IoIosCloseOutline from 'react-icons/lib/io/ios-close-outline';

import classNames from '../styles/CloseButtonStylesheet.css';

const styles = {
  closeButton: {
    width: 52, height: 52, padding: 8,
  },
};

const CloseButton = props => <div className={classNames.this}>
  <IconButton
    className={classNames.button}
    onTouchTap={_ => props.notifyClose()}
    style={styles.closeButton}
  >
    <IoIosCloseOutline className={classNames.icon} />
  </IconButton>
</div>;

CloseButton.propTypes = {
  notifyClose: React.PropTypes.func.isRequired,
};

export default CloseButton;
