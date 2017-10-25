import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
import { Tabs, Tab } from 'shared/components/Material';
import { green500 } from 'tools/colors';
import LoginForm from './LoginForm';
import NewUserForm from './NewUserForm';
import classNames from '../styles/LoginPageStylesheet.css';

const propTypes = {
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
};

const contextTypes = {
  loggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired,
};

class LoginPage extends React.Component {
  state = {
    initialSelectedIndex: 0,
  };
  componentWillMount () {
    const { location } = this.props;
    if (location.state && location.state.newUser) {
      this.setState({ initialSelectedIndex: 1 });
    }
  }
  loginUser = (data) => {
    const { router, location } = this.props;
    const { setLoggedIn, setUserId } = this.context;
    const nextPage = (location.state && location.state.previousPage) || '/profile';
    localStorage.setItem('id_token', data.jwtToken);
    localStorage.setItem('user_uuid', data.userId);
    setLoggedIn(true);
    setUserId(data.userId);
    router.replace(nextPage);
  }
  render () {
    const { relay } = this.props;
    const { initialSelectedIndex } = this.state;

    return (
      <Layout center>
        <div className={classNames.tabs}>
          <Tabs
            initialSelectedIndex={initialSelectedIndex}
            inkBarStyle={{ backgroundColor: green500 }}
          >
            <Tab label={'Login'}>
              <LoginForm relay={relay} loginUser={this.loginUser} />
            </Tab>
            <Tab label={'New User'}>
              <NewUserForm relay={relay} loginUser={this.loginUser} />
            </Tab>
          </Tabs>
        </div>
      </Layout>
    );
  }
}

LoginPage.propTypes = propTypes;
LoginPage.contextTypes = contextTypes;

// this part seems to be necessary for making the mutation possible
export default createFragmentContainer(LoginPage, {
  query: graphql`
    fragment LoginPage_query on Query { id }
  `,
});
