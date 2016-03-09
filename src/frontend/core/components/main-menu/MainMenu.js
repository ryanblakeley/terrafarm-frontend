import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import FaUser from 'react-icons/lib/fa/user';
import GoSignOut from 'react-icons/lib/go/sign-out';
import MdSearch from 'react-icons/lib/md/search';

import classNames from './styles/MainMenuStylesheet.css';
const styles = {
  icon: {
    color: Colors.blueGrey50,
  },
};

export default class MainMenu extends React.Component {
  static propTypes = {
    close: React.PropTypes.bool,
    onHide: React.PropTypes.func,
  };
  static contextTypes = {
    router: React.PropTypes.object,
    refresh: React.PropTypes.func,
  };
  handleProfile = () => {
    const {onHide} = this.props;
    const {router} = this.context;

    onHide();
    router.push('/auth/profile');
  }
  handleSignOut = () => {
    const {onHide} = this.props;
    const {router, refresh} = this.context;

    localStorage.removeItem('id_token');
    onHide();
    router.push('/');
    refresh();
  }
  handleBrowse = () => {
    const {onHide} = this.props;
    const {router} = this.context;

    onHide();
    router.push('/auth/browse');
  }
  handleHome = () => {
    const {onHide} = this.props;
    const {router} = this.context;

    onHide();
    router.push('/');
  }
  render () {
    return <div className={classNames.this}>
      <IconButton
        tooltip={'Profile'}
        onTouchTap={this.handleProfile}
        iconStyle={styles.icon}
        touch
      >
        <FaUser className={classNames.icon} />
      </IconButton>
      <IconButton
        tooltip={'Browse'}
        onTouchTap={this.handleBrowse}
        iconStyle={styles.icon}
        touch
      >
        <MdSearch className={classNames.icon} />
      </IconButton>
      <IconButton
        tooltip={'Logout'}
        onTouchTap={this.handleSignOut}
        iconStyle={styles.icon}
        touch
      >
        <GoSignOut className={classNames.icon} />
      </IconButton>
    </div>;
  }
}
