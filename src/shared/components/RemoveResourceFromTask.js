import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/FlatButton';

import RemoveResourceFromTaskMutation from '../mutations/RemoveResourceFromTaskMutation';

class RemoveResourceFromTask extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    task: React.PropTypes.object,
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
  };
  static defaultProps = {
    label: 'Remove',
    primary: false,
    secondary: false,
  };
  handleRemove = () => {
    const {resource, task} = this.props;
    Relay.Store.commitUpdate(
      new RemoveResourceFromTaskMutation({
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
        onTouchTap={this.handleRemove}
      />
    );
  }
}

export default Relay.createContainer(RemoveResourceFromTask, {
  initialVariables: {
    taskId: null,
  },
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        id,
        name,
        ${RemoveResourceFromTaskMutation.getFragment('task')},
      },
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RemoveResourceFromTaskMutation.getFragment('resource')},
      }
    `,
  },
});
