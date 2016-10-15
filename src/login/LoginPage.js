import React, { Component, PropTypes } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SignUp from './components/SignUp';
import Login from './components/Login';
import classNames from './styles/LoginPageStylesheet.css';

export default class LoginPage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    setLoggedIn: PropTypes.func.isRequired,
    setUserId: PropTypes.func.isRequired,
  };
  loginUser = data => {
    localStorage.setItem('id_token', data.token);
    localStorage.setItem('user_uuid', data.id);
    this.context.setLoggedIn(true);
    this.context.setUserId(data.id);
    this.context.router.push('/profile');
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
