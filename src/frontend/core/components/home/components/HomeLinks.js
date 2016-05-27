import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import IoLogIn from 'react-icons/lib/io/log-in';
import IoLogOut from 'react-icons/lib/io/log-out';
import TiInfo from 'react-icons/lib/ti/info-large';

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
    lock: React.PropTypes.object,
    loggedIn: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
    refresh: React.PropTypes.func,
  };
  handleSignIn = () => {
    const {lock, router} = this.context;

    router.replace('/home');

    lock.show({
      authParams: {
        scope: 'openid profile',
      },
    });
  }
  handleAbout = () => {
    const {router} = this.context;
    router.push('/about');
  }
  handleSignOut = () => {
    const {router, refresh} = this.context;
    localStorage.removeItem('id_token');
    router.push('');
    refresh();
  }
  handleBrowse = () => {
    const {router} = this.context;

    router.push('/auth/browse');
  }
  render () {
    const {loggedIn} = this.context;

    if (loggedIn) {
      return <div className={classNames.this}>
        <div className={classNames.left} >
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
        <div className={classNames.right} >
          <IconButton
            tooltip={'About'}
            tooltipStyles={styles.tooltip}
            style={styles.button}
            iconStyle={styles.icon}
            onTouchTap={this.handleAbout}
            touch
          >
            <TiInfo className={classNames.icon} />
          </IconButton>
        </div>
      </div>;
    }
    return <div className={classNames.this}>
      <div className={classNames.left} >
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
      <div className={classNames.right} >
        <IconButton
          tooltip={'About'}
          tooltipStyles={styles.tooltip}
          style={styles.button}
          iconStyle={styles.icon}
          onTouchTap={this.handleAbout}
          touch
        >
          <TiInfo className={classNames.icon} />
        </IconButton>
      </div>
    </div>;
  }
}
