import React from 'react';
import Relay from 'react-relay';
import NewUserMutation from '../mutations/NewUserMutation';

// import classNames from '../styles/AuthorizeContainerStylesheet.css';

class AuthorizeContainer extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
    master: React.PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    lock: React.PropTypes.object,
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
  createNewUser () {
    const {master} = this.props;
    const profile = this.getProfile();
    const {email, picture} = profile;
    let {name} = profile;

    name = name.split(' ')[0];

    Relay.Store.commitUpdate(
      new NewUserMutation({
        master,
        name,
        email,
        image: picture,
      })
    );
  }
  render () {
    return <div>Authorizing...</div>;
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
