import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import RemovePendingResourceToTaskMutation from '../mutations/RemovePendingResourceToTaskMutation';

class RemovePendingResourceToTask extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    task: React.PropTypes.object,
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
  };
  static defaultProps = {
    label: 'Confirm',
    primary: false,
    secondary: false,
  };
  handleConfirm = () => {
    const {resource, task} = this.props;
    Relay.Store.commitUpdate(
      new RemovePendingResourceToTaskMutation({
        resource,
        task,
      })
    );
  }
  render () {
    return (
      <FlatButton
        resource={this.props.resource}
        task={this.props.task}
        label={this.props.label}
        primary={this.props.primary}
        secondary={this.props.secondary}
        onTouchTap={this.handleConfirm}
      />
    );
  }
}

export default Relay.createContainer(RemovePendingResourceToTask, {
  initialVariables: {
    taskId: null,
  },
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        id,
        name,
        ${RemovePendingResourceToTaskMutation.getFragment('task')},
      },
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RemovePendingResourceToTaskMutation.getFragment('resource')},
      }
    `,
  },
});
