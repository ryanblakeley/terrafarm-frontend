// Vendor
import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

// Local
import SignUp from './components/SignUp';
import Login from './components/Login';
import networkLayer from '../lib/networkLayer';

// Styles
import classNames from './styles/LoginPageStylesheet.css';

export default class LoginPage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    setLoggedIn: PropTypes.func.isRequired,
    setUserId: PropTypes.func.isRequired,
  };
  componentDidMount () {
    const { router, loggedIn } = this.context;

    if (loggedIn) {
      router.replace('/profile');
    }
  }
  loginUser = data => {
    const { router, setLoggedIn, setUserId } = this.context;
    localStorage.setItem('id_token', data.token);
    Relay.injectNetworkLayer(networkLayer(data.token));
    setLoggedIn(true);
    setUserId(data.id);
    router.push('/profile');
  }
  render () {
    return (
      <div className={classNames.this}>
        <div className={classNames.tabs}>
          <Tabs>
            <Tab label={'Log In'}>
              <Login loginUser={this.loginUser} />
            </Tab>
            <Tab label={'Sign Up'}>
              <SignUp loginUser={this.loginUser} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
