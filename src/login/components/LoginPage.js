import React, { Component, PropTypes } from 'react';
import Layout from 'shared/components/Layout';
import {Tabs, Tab} from 'shared/components/Material';
import LoginForm from './LoginForm';
import NewUserForm from './NewUserForm';
import classNames from '../styles/LoginPageStylesheet.css';

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
      <Layout center>
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
      </Layout>
    );
  }
}
