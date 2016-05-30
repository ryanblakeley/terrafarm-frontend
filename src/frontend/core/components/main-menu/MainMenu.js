import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import IoPerson from 'react-icons/lib/io/person';
import IoLogOut from 'react-icons/lib/io/log-out';
import MdSearch from 'react-icons/lib/md/search';
import MainMenuItem from './components/MainMenuItem';

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
    router.push('/profile');
  }
  handleSignOut = () => {
    const {onHide} = this.props;
    const {router, refresh} = this.context;

    localStorage.removeItem('id_token');
    onHide();
    router.push('');
    refresh();
  }
  handleBrowse = () => {
    const {onHide} = this.props;
    const {router} = this.context;

    onHide();
    router.push('/browse');
  }
  handleHome = () => {
    const {onHide} = this.props;
    const {router} = this.context;

    onHide();
    router.push('/');
  }
  render () {
    return <div className={classNames.this}>
      <MainMenuItem
        label={'Profile'}
        onSelect={this.handleProfile}
        icon={<IoPerson className={classNames.icon} style={styles.icon} />}
      />
      <MainMenuItem
        label={'Browse'}
        onSelect={this.handleBrowse}
        icon={<MdSearch className={classNames.icon} style={styles.icon} />}
      />
      <MainMenuItem
        label={'Logout'}
        onSelect={this.handleSignOut}
        icon={<IoLogOut className={classNames.icon} style={styles.icon} />}
      />
    </div>;
  }
}
