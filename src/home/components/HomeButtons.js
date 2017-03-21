import React from 'react';
import {Link} from 'shared/components/Typography';
import {RaisedButton, FlatButton} from 'shared/components/Material';
import Layout from 'shared/components/Layout';
// import classNames from '../styles/HomeButtonsStylesheet.css';

const newUserLink = <Link to={{ pathname: '/login', state: {newUser: true} }}>
  <RaisedButton label={'New User'} primary />
</Link>;

const profileLink = <Link to={'/profile'}>
  <RaisedButton label={'Profile'} primary />
</Link>;

const loginLink = <Link to={'/login'}>
  <RaisedButton label={'Login'} />
</Link>;

const browseLink = <Link to={'/browse'}>
  <FlatButton
    label={'Map of Farms'}
    secondary
    labelStyle={{fontSize: 18}}
  />
</Link>;

class HomeButtons extends React.Component {
  static contextTypes = {
    loggedIn: React.PropTypes.bool,
    setLoggedIn: React.PropTypes.func,
    router: React.PropTypes.object,
  };
  handleSignOut = () => {
    const { router, setLoggedIn } = this.context;
    localStorage.setItem('id_token', window.anonymousToken);
    localStorage.removeItem('user_uuid');
    setLoggedIn(false);
    router.push('/');
  }
  render () {
    const {loggedIn} = this.context;
    const leftLink = <Layout inline rightSmall>
      {!loggedIn ? newUserLink : profileLink}
    </Layout>;
    const rightLink = !loggedIn ? loginLink : <RaisedButton
      label={'Logout'}
      onTouchTap={this.handleSignOut}
    />;

    return <Layout>
      <Layout topMedium>
        {browseLink}
      </Layout>
      <Layout topMedium>
        {leftLink}
        {rightLink}
      </Layout>
    </Layout>;
  }
}
export default HomeButtons;
