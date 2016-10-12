import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/FlatButton';

import PendingResourceToTaskMutation from '../mutations/PendingResourceToTaskMutation';

class AddPendingResource extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    task: React.PropTypes.object,
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    onComplete: React.PropTypes.func,
    disabled: React.PropTypes.bool,
  };
  static defaultProps = {
    label: 'Confirm',
    primary: false,
    secondary: false,
  };
  onComplete = () => {
    if (this.props.onComplete) {
      this.props.onComplete();
    }
  }
  handleConfirm = () => {
    const {resource, task} = this.props;
    Relay.Store.commitUpdate(
      new PendingResourceToTaskMutation({
        resource,
        task,
      })
    );
    this.onComplete();
  }
  render () {
    return <FlatButton
      label={this.props.label}
      primary={this.props.primary}
      secondary={this.props.secondary}
      disabled={this.props.disabled}
      onTouchTap={this.handleConfirm}
    />;
  }
}

export default Relay.createContainer(AddPendingResource, {
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        id,
        ${PendingResourceToTaskMutation.getFragment('task')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        users(first: 1) {
          edges {
            node { id }
          }
        }
        ${PendingResourceToTaskMutation.getFragment('resource')},
      }
    `,
  },
});
