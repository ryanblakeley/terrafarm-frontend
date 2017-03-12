import React from 'react';
import {IconButton} from './Material';
import {CloseIcon} from './Icons';
import Layout from './Layout';
import classNames from '../styles/CloseButtonStylesheet.css';

const styles = {
  closeButton: {
    width: 52, height: 52, padding: 8,
  },
};

const CloseButton = props => <Layout center>
  <IconButton
    onTouchTap={_ => props.notifyClose()}
    style={styles.closeButton}
  >
    <CloseIcon className={classNames.icon} />
  </IconButton>
</Layout>;

CloseButton.propTypes = {
  notifyClose: React.PropTypes.func.isRequired,
};

export default CloseButton;
