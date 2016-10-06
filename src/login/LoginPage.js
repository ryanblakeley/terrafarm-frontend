// Vendor
import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

// Local
import { networkAddress } from 'shared/utils/network';
import SignUp from './components/SignUp';
import Login from './components/Login';

// Styles
import classNames from './styles/LoginPageStylesheet.css';

export default class LoginPage extends Component {
  static propTypes = {
    viewer: PropTypes.object,
    master: PropTypes.object,
    children: PropTypes.object,
  };
  static contextTypes = {
    router: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    setLoggedIn: PropTypes.func.isRequired,
  };
  state = {
    idToken: null
  };
  componentWillMount () {
    this.injectAuthToken();
  }
  componentDidMount () {
    const {router, loggedIn} = this.context;

    if (!this.state.idToken) {

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

    if (!idToken) {
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
  loginUser = (token) => {
    const { loggedIn, router, setLoggedIn } = this.context;
    localStorage.setItem('id_token', token);
    setLoggedIn(true);
    this.setState({ idToken: token });
    router.push('/profile');
  }
  render () {
    const { router } = this.context;
    const { canSubmit, loginError } = this.state;

    return (
      <div className={classNames.this}>
        <div className={classNames.tabs}>
          <Tabs>
            <Tab label='Log In'>
              <Login loginUser={this.loginUser} />
            </Tab>
            <Tab label='Sign Up'>
              <SignUp loginUser={this.loginUser} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
