import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import AddResourceToTaskMutation from '../mutations/AddResourceToTaskMutation';
import RemovePendingResourceToTaskMutation from '../../shared/mutations/RemovePendingResourceToTaskMutation';

class AddResource extends React.Component {
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
    label: 'Approve',
    primary: false,
    secondary: false,
  };
  onComplete = () => {
    if (this.props.onComplete) {
      this.props.onComplete();
    }
  }
  handleApprove = () => {
    const {resource, task} = this.props;
    Relay.Store.commitUpdate(
      new AddResourceToTaskMutation({
        resource,
        task,
      })
    );
    Relay.Store.commitUpdate(
      new RemovePendingResourceToTaskMutation({
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
      onTouchTap={this.handleApprove}
    />;
  }
}


export default Relay.createContainer(AddResource, {
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        id,
        ${AddResourceToTaskMutation.getFragment('task')},
        ${RemovePendingResourceToTaskMutation.getFragment('task')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        ${AddResourceToTaskMutation.getFragment('resource')},
        ${RemovePendingResourceToTaskMutation.getFragment('resource')},
      }
    `,
  },
});
