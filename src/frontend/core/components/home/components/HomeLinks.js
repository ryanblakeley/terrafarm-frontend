import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import GoSignIn from 'react-icons/lib/go/sign-in';
import GoSignOut from 'react-icons/lib/go/sign-out';
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
            <GoSignOut className={classNames.icon} />
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
          <GoSignIn className={classNames.icon} />
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
