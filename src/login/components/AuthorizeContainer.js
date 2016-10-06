import React from 'react';
import Relay from 'react-relay';
import NewUserMutation from '../mutations/NewUserMutation';

import classNames from '../styles/AuthorizeContainerStylesheet.css';

// TODO: Remove references to `lock` and update the component
//
class AuthorizeContainer extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
    master: React.PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    idToken: React.PropTypes.string,
    loggedIn: React.PropTypes.bool,
    setLoggedIn: React.PropTypes.func,
    refresh: React.PropTypes.func,
  };
  componentWillMount () {
    const {router, idToken, setLoggedIn, refresh} = this.context;
    const {viewer} = this.props;

    if (idToken) {
      if (!viewer) {
        this.createNewUser();
        refresh();
      } else {
        setLoggedIn(true);
        router.replace('/profile');
      }
    } else {
      setLoggedIn(false);
      console.log('[Error] refresh and try loging in again.');
      router.replace('/');
    }
  }
  getProfile () {
    const {lock, idToken} = this.context;
    let result;

    lock.getProfile(idToken, (err, profile) => {
      if (err) {
        console.log('Error loading the Profile', err);
        return;
      }
      result = profile;
    });

    return result;
  }
  render () {
    return <div className={classNames.text}>Still authorizing...</div>;
  }
}

export default Relay.createContainer(AuthorizeContainer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        email,
      },
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${NewUserMutation.getFragment('master')},
      }
    `,
  },
});
