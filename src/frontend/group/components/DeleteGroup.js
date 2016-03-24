import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import DeleteGroupMutation from '../mutations/DeleteGroupMutation';

class DeleteGroup extends React.Component {
  static propTypes = {
    group: React.PropTypes.object,
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    default: React.PropTypes.bool,
    onComplete: React.PropTypes.func,
    disabled: React.PropTypes.bool,
  };
  static contextTypes = {
    router: React.PropTypes.object,
  };
  static defaultProps = {
    label: 'Delete',
    primary: false,
    secondary: false,
    default: true,
  };
  handleDelete = () => {
    const {group, master, user} = this.props;

    Relay.Store.commitUpdate(
      new DeleteGroupMutation({
        master,
        group,
        user,
      })
    );

    this.handleComplete();
  }
  handleComplete = () => {
    const {router} = this.context;

    if (this.props.onComplete) {
      this.props.onComplete();
    }
    router.push('/auth/profile');
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

export default Relay.createContainer(DeleteGroup, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        ${DeleteGroupMutation.getFragment('group')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${DeleteGroupMutation.getFragment('master')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        ${DeleteGroupMutation.getFragment('user')},
      }
    `,
  },
});
