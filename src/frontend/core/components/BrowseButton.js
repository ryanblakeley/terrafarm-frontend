import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import IoIosSearch from 'react-icons/lib/io/ios-search';

import classNames from '../styles/BrowseButtonStylesheet.css';
const styles = {
  button: {
    width: 58,
    height: 58,
  },
  icon: {
    color: Colors.blue600,
  },
};

export default class BrowseButton extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    loggedIn: React.PropTypes.bool,
  };
  handleBrowse = () => {
    const {router} = this.context;

    router.push('/browse');
  }
  render () {
    const {loggedIn} = this.context;

    if (loggedIn) {
      return <div className={classNames.this}>
        <IconButton
          style={styles.button}
          iconStyle={styles.icon}
          onTouchTap={this.handleBrowse}
          touch
        >
          <IoIosSearch className={classNames.icon} />
        </IconButton>
      </div>;
    }
    return null;
  }
}
