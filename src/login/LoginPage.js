import React, { Component, PropTypes } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import LoginForm from './components/LoginForm';
import NewUserForm from './components/NewUserForm';
import classNames from './styles/LoginPageStylesheet.css';

export default class LoginPage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    setLoggedIn: PropTypes.func.isRequired,
    setUserId: PropTypes.func.isRequired,
  };
  state = {
    initialSelectedIndex: 0,
  };
  componentWillMount () {
    const {location} = this.context;
    if (location.state && location.state.newUser) {
      this.setState({initialSelectedIndex: 1});
    }
  }
  loginUser = data => {
    localStorage.setItem('id_token', data.jwtToken);
    localStorage.setItem('user_uuid', data.userId);
    this.context.setLoggedIn(true);
    this.context.setUserId(data.userId);
    this.context.router.push('/profile');
  }
  render () {
    const {initialSelectedIndex} = this.state;

    return (
      <div className={classNames.this}>
        <div className={classNames.tabs}>
          <Tabs initialSelectedIndex={initialSelectedIndex} >
            <Tab label={'Login'}>
              <LoginForm loginUser={this.loginUser} />
            </Tab>
            <Tab label={'New User'}>
              <NewUserForm loginUser={this.loginUser} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
