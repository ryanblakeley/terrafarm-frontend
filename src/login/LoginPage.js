import React from 'react';
import Relay from 'react-relay';

import classNames from './styles/LoginPageStylesheet.css';

const { REVERSE_PROXY_PUBLIC_IP, PORT, AUTH0_CLIENT_ID, AUTH0_DOMAIN } = process.env;

const networkAddress = REVERSE_PROXY_PUBLIC_IP === 'localhost'
  ? `${REVERSE_PROXY_PUBLIC_IP}:${PORT}`
  : REVERSE_PROXY_PUBLIC_IP;

export default class LoginPage extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
    master: React.PropTypes.object,
    children: React.PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
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
          callbackURL: `http://${networkAddress}/login`,
        },
        container: 'auth0_container',
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
    const {router} = this.context;

    return <div className={classNames.this}>

      {router.isActive('/login/authorize')
        && <div className={classNames.text}>
          Authorizing...
        </div>
      }

      <div className={classNames.auth0Container} id={'auth0_container'} />

      {this.props.children}
    </div>;
  }
}
