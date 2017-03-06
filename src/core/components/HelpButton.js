import React from 'react';
import {IconButton} from 'shared/components/Material';
import {blueGrey500} from 'material-ui/styles/colors';
import {InformationIcon} from 'shared/components/Icons';
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
    <InformationIcon className={classNames.icon} />
  </IconButton>
</div>;

HelpButton.contextTypes = {
  router: React.PropTypes.object,
};

export default HelpButton;
