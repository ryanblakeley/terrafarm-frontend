import React from 'react';
import Relay from 'react-relay';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import IoLogIn from 'react-icons/lib/io/log-in';

import classNames from './styles/LoginPageStylesheet.css';

const styles = {
  button: {
    fontSize: 'inherit',
    width: 58,
    height: 58,
  },
  icon: { color: Colors.deepOrange300 },
};
const { PUBLIC_IP, FRONTEND_PORT, AUTH0_CLIENT_ID, AUTH0_DOMAIN } = process.env;

const networkAddress = PUBLIC_IP === 'localhost'
  ? `${PUBLIC_IP}:${FRONTEND_PORT}`
  : PUBLIC_IP;

export default class LoginPage extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
    master: React.PropTypes.object,
    children: React.PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    location: React.PropTypes.object,
    loggedIn: React.PropTypes.bool,
  };
  static childContextTypes = {
    lock: React.PropTypes.object,
    idToken: React.PropTypes.string,
  };
  state = {
    idToken: null,
  };
  getChildContext () {
    return {
      lock: this.lock,
      idToken: this.state.idToken,
    };
  }
  componentWillMount () {
    if (!this.lock) {
      this.lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);
    }

    this.injectAuthToken();
  }
  componentDidMount () {
    const {router, loggedIn} = this.context;

    if (!this.state.idToken) {
      this.lock.show({
        authParams: {
          scope: 'openid profile',
          callbackURL: 'http://localhost:3000/login',
        },
      });
    } else if (loggedIn) {
      router.replace('/profile');
    } else {
      router.push('/login/authorize');
    }
  }
  componentWillUpdate (nextProps, nextState) {
    const {idToken} = nextState;

    if (idToken !== this.state.idToken) {
      this.injectAuthToken();
    }
  }
  getIdToken () {
    let idToken = localStorage.getItem('id_token');
    const authHash = this.lock && this.lock.parseHash(window.location.hash);

    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('id_token', authHash.id_token);
      }
      if (authHash.error) {
        console.log('Error signing in', authHash);
        return null;
      }
    }

    return idToken;
  }
  handleSignIn = () => {
    const {router} = this.context;

    if (!this.state.idToken) {
      this.lock.show({
        authParams: {
          scope: 'openid profile',
          callbackURL: 'http://localhost:3000/login',
        },
      });
    } else {
      router.push('/login/authorize');
    }
  }
  injectAuthToken () {
    const token = this.getIdToken();

    if (token) {
      Relay.injectNetworkLayer(
        new Relay.DefaultNetworkLayer(`http://${networkAddress}/graphql`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
    }

    this.setState({idToken: token});
  }
  render () {
    return <div className={classNames.this}>
      <h2 className={classNames.pageHeading}>Login</h2>
      <IconButton
        style={styles.button}
        iconStyle={styles.icon}
        onTouchTap={this.handleSignIn}
      >
        <IoLogIn className={classNames.icon} />
      </IconButton>

      {this.props.children}
    </div>;
  }
}
