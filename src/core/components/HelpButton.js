import React from 'react';
import IconButton from 'material-ui/IconButton';
import {blueGrey500} from 'material-ui/styles/colors';
import IoInformationCircled from 'react-icons/lib/io/ios-help-outline';
import classNames from '../styles/HelpButtonStylesheet.css';

const styles = {
  button: {
    padding: 8,
    width: 42,
    height: 42,
  },
  icon: {
    color: blueGrey500,
  },
};

const HelpButton = (_, context) => <div className={classNames.this}>
  <IconButton
    style={styles.button}
    iconStyle={styles.icon}
    onTouchTap={() => context.router.push('/about')}
    touch
  >
    <IoInformationCircled className={classNames.icon} />
  </IconButton>
</div>;

HelpButton.contextTypes = {
  router: React.PropTypes.object,
};

export default HelpButton;
