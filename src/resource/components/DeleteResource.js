import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import DeleteResourceMutation from '../mutations/DeleteResourceMutation';

class DeleteResource extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
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
    const {resource, master, user} = this.props;

    Relay.Store.commitUpdate(
      new DeleteResourceMutation({
        master,
        resource,
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
    router.push('/profile');
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

export default Relay.createContainer(DeleteResource, {
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        ${DeleteResourceMutation.getFragment('resource')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${DeleteResourceMutation.getFragment('master')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        ${DeleteResourceMutation.getFragment('user')},
      }
    `,
  },
});
