import React from 'react';
import Relay from 'react-relay';
import NewUserMutation from './mutations/NewUserMutation';

export default class AuthContainer extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
    master: React.PropTypes.object,
    children: React.PropTypes.object,
  };
  static contextTypes = {
    loggedIn: React.PropTypes.bool,
    lock: React.PropTypes.object,
    idToken: React.PropTypes.string,
  };
  componentWillMount () {
    const {viewer} = this.props;
    const {loggedIn} = this.context;

    if (loggedIn && !viewer) {
      console.log('not registered');
      this.createNewUser();
    }
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
    return <div >
      {this.props.children}
    </div>;
  }
}

export default Relay.createContainer(AuthContainer, {
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
