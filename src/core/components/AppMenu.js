import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'shared/components/Layout';
import { FlatButton } from 'shared/components/Material';
import { MoreIcon, FoodIcon, BookmarkIcon, JournalIcon, PersonIcon, LoginIcon, ArrowRightIcon }
  from 'shared/components/Icons';
import { Link } from 'shared/components/Typography';
import classNames from '../styles/AppMenuStylesheet.css';

const propTypes = {
  timeoutDelay: PropTypes.number,
  router: PropTypes.object.isRequired,
};

const defaultProps = {
  timeoutDelay: 310,
};

const buttonPropTypes = {
  disabled: PropTypes.bool,
};

const buttonDefaultProps = {
  disabled: false,
};

const contextTypes = {
  loggedIn: PropTypes.bool,
};

function handleSignout (context, replace) {
  localStorage.setItem('id_token', window.anonymousToken);
  localStorage.setItem('user_uuid', '');
  context.setLoggedIn(false);
  context.setUserId('');
  replace('/');
}

const MenuButton = (props) => <FlatButton {...props} icon={<MoreIcon />} />;

const FoodButton = (props) => <Link to={'/foods'} >
  <FlatButton label={'Foods'} icon={<FoodIcon />} disabled={props.disabled} />
</Link>;

const PresetsButton = (props) => <Link to={'/presets'} >
  <FlatButton label={'Presets'} icon={<BookmarkIcon />} disabled={props.disabled} />
</Link>;

const JournalButton = (props) => <Link to={'/journal'} >
  <FlatButton label={'Journal'} icon={<JournalIcon />} disabled={props.disabled} />
</Link>;

const ProfileButton = (props) => <Link to={'/profile'} >
  <FlatButton label={'Profile'} icon={<PersonIcon />} disabled={props.disabled} />
</Link>;

const LoginButton = (props) => <Link to={'/login'} >
  <FlatButton label={'Login'} icon={<LoginIcon />} disabled={props.disabled} />
</Link>;

const LogoutButton = (props, context) => <FlatButton
  onClick={() => { handleSignout(context, props.router.replace); }}
  onTouchTap={() => { handleSignout(context, props.router.replace); }}
  label={'Logout'}
  icon={<ArrowRightIcon />}
/>;

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
  render () {
    const { router } = this.props;
    const { open } = this.state;
    const { loggedIn } = this.context;

    return <div className={classNames.this} >
      <MenuButton
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        onTouchTap={this.handleToggle}
      />
      {open && <Layout
        center
        className={classNames.buttons}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
      >
        {!loggedIn && <LoginButton />}
        {loggedIn && <ProfileButton />}
        {loggedIn && <JournalButton />}
        {loggedIn && <PresetsButton />}
        <FoodButton />
        {loggedIn && <LogoutButton router={router} />}
      </Layout>}
    </div>;
  }
}

AppMenu.propTypes = propTypes;
LogoutButton.propTypes = { router: PropTypes.object.isRequired };
MenuButton.propTypes = { };
FoodButton.propTypes = buttonPropTypes;
PresetsButton.propTypes = buttonPropTypes;
JournalButton.propTypes = buttonPropTypes;
ProfileButton.propTypes = buttonPropTypes;
LoginButton.propTypes = buttonPropTypes;

FoodButton.defaultProps = buttonDefaultProps;
PresetsButton.defaultProps = buttonDefaultProps;
JournalButton.defaultProps = buttonDefaultProps;
ProfileButton.defaultProps = buttonDefaultProps;
LoginButton.defaultProps = buttonDefaultProps;

AppMenu.defaultProps = defaultProps;

AppMenu.contextTypes = contextTypes;
LogoutButton.contextTypes = {
  setLoggedIn: PropTypes.func,
  setUserId: PropTypes.func,
};

export default AppMenu;
