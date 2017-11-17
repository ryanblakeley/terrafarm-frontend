import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'shared/components/Layout';
import { FlatButton } from 'shared/components/Material';
import { MoreIcon, FoodIcon, BookmarkIcon, JournalIcon, PersonIcon, LoginIcon, ArrowRightIcon }
  from 'shared/components/Icons';
import classNames from '../styles/AppMenuStylesheet.css';

const propTypes = {
  timeoutDelay: PropTypes.number,
  router: PropTypes.object.isRequired,
};

const defaultProps = {
  timeoutDelay: 310,
};

const contextTypes = {
  loggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func,
  setUserId: PropTypes.func,
};

class AppMenu extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      open: false,
      closeTimeoutId: null,
      openTimeoutId: null,
    };
  }
  componentWillUnmount () {
    clearTimeout(this.state.closeTimeoutId);
    clearTimeout(this.state.openTimeoutId);
  }
  setOpen = () => {
    this.setState({
      openTimeoutId: setTimeout(() => {
        clearTimeout(this.state.closeTimeoutId);
        this.setState({
          open: true,
        });
      }, 1),
    });
  }
  setClose = () => {
    const { timeoutDelay } = this.props;

    this.setState({
      closeTimeoutId: setTimeout(() => {
        // clearTimeout(this.state.openTimeoutId);
        this.setState({
          open: false,
        });
      }, timeoutDelay),
    });
  }
  setCloseImmediate = () => {
    this.setState({ open: false });
  }
  handleToggle = () => {
    const { open } = this.state;

    if (open) {
      this.handleTouchClose();
    } else {
      this.handleEnter();
    }
  }
  handleEnter = () => {
    this.setOpen();
  }
  handleLeave = () => {
    this.setClose();
  }
  handleTouchClose = () => {
    this.setCloseImmediate();
  }
  handleSignout = () => {
    const { router } = this.props;
    const { setLoggedIn, setUserId } = this.context;
    localStorage.setItem('id_token', window.anonymousToken);
    localStorage.setItem('user_uuid', '');
    setLoggedIn(false);
    setUserId('');
    router.replace('/');
  }
  render () {
    const { router } = this.props;
    const { open } = this.state;
    const { loggedIn } = this.context;

    return <div className={classNames.this} >
      <FlatButton
        icon={<MoreIcon />}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        onTouchTap={this.handleToggle}
      />
      {open && <Layout
        center
        className={classNames.buttons}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        onTouchTap={this.handleTouchClose}
      >
        {!loggedIn && <Layout>
          <FlatButton
            label={'Login'}
            icon={<LoginIcon />}
            onTouchTap={() => router.push('/login')}
          />
        </Layout>}
        {loggedIn && <Layout>
          <FlatButton
            label={'Profile'}
            icon={<PersonIcon />}
            onTouchTap={() => router.push('profile')}
          />
        </Layout>}
        {loggedIn && <Layout>
          <FlatButton
            label={'Journal'}
            icon={<JournalIcon />}
            onTouchTap={() => router.push('/journal')}
          />
        </Layout>}
        {loggedIn && <Layout>
          <FlatButton
            label={'Presets'}
            icon={<BookmarkIcon />}
            onTouchTap={() => router.push('/presets')}
          />
        </Layout>}
        <Layout>
          <FlatButton
            label={'Foods'}
            icon={<FoodIcon />}
            onTouchTap={() => router.push('/foods')}
          />
        </Layout>
        {loggedIn && <Layout>
          <FlatButton
            label={'Logout'}
            icon={<ArrowRightIcon />}
            onTouchTap={this.handleSignout}
          />
        </Layout>}
      </Layout>}
    </div>;
  }
}

AppMenu.propTypes = propTypes;
AppMenu.defaultProps = defaultProps;
AppMenu.contextTypes = contextTypes;

export default AppMenu;
