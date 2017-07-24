import PropTypes from 'prop-types';
import React from 'react';
import { IconButton } from './Material';
import { CloseIcon } from './Icons';
import Layout from './Layout';
import classNames from '../styles/CloseButtonStylesheet.css';

const styles = {
  closeButton: {
    width: 52, height: 52, padding: 8,
  },
};

const propTypes = {
  notifyClose: PropTypes.func.isRequired,
};

const CloseButton = props => <Layout center>
  <IconButton
    onTouchTap={() => props.notifyClose()}
    style={styles.closeButton}
  >
    <CloseIcon className={classNames.icon} />
  </IconButton>
</Layout>;

CloseButton.propTypes = propTypes;

export default CloseButton;
