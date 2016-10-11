import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import DeleteUserMutation from '../mutations/DeleteUserMutation';

class DeleteUser extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    master: React.PropTypes.object,
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    default: React.PropTypes.bool,
    onComplete: React.PropTypes.func,
    disabled: React.PropTypes.bool,
  };
  static contextTypes = {
    refresh: React.PropTypes.func,
    router: React.PropTypes.object,
  };
  static defaultProps = {
    label: 'Delete',
    primary: false,
    secondary: false,
    default: true,
  };
  handleDelete = () => {
    const {user, master} = this.props;

    Relay.Store.commitUpdate(
      new DeleteUserMutation({
        master,
        user,
      })
    );

    this.handleComplete();
  }
  handleComplete = () => {
    const {router, refresh} = this.context;

    if (this.props.onComplete) {
      this.props.onComplete();
    }

    localStorage.removeItem('id_token');
    router.push('/home');
    refresh();
  }
  render () {
    return (
      <FlatButton
        {...this.props}
        label={'Delete'}
        onTouchTap={this.handleDelete}
      />
    );
  }
}

export default Relay.createContainer(DeleteUser, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        ${DeleteUserMutation.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${DeleteUserMutation.getFragment('master')},
      }
    `,
  },
});
