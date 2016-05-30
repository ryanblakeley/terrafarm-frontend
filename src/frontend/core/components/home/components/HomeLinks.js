import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import IoLogIn from 'react-icons/lib/io/log-in';
import IoLogOut from 'react-icons/lib/io/log-out';

import classNames from '../styles/HomeLinksStylesheet.css';
const styles = {
  button: {
    width: 58,
    height: 58,
  },
  icon: {
    color: Colors.deepOrange300,
  },
};

export default class HomeLinks extends React.Component {
  static contextTypes = {
    loggedIn: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
    refresh: React.PropTypes.func,
  };
  handleSignIn = () => {
    const {router} = this.context;

    router.push('/login');
  }
  handleSignOut = () => {
    const {refresh} = this.context;
    localStorage.removeItem('id_token');
    // router.push('');
    refresh();
  }
  handleBrowse = () => {
    const {router} = this.context;

    router.push('/browse');
  }
  render () {
    const {loggedIn} = this.context;

    if (loggedIn) {
      return <div className={classNames.this}>
        <div className={classNames.centerButton} >
          <IconButton
            tooltip={'Logout'}
            style={styles.button}
            iconStyle={styles.icon}
            onTouchTap={this.handleSignOut}
            touch
          >
            <IoLogOut className={classNames.icon} />
          </IconButton>
        </div>
      </div>;
    }
    return <div className={classNames.this}>
      <div className={classNames.centerButton} >
        <IconButton
          tooltip={'Login'}
          tooltipStyles={styles.tooltip}
          style={styles.button}
          iconStyle={styles.icon}
          onTouchTap={this.handleSignIn}
          touch
        >
          <IoLogIn className={classNames.icon} />
        </IconButton>
      </div>
    </div>;
  }
}
