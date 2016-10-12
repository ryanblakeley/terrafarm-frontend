import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/FlatButton';

import AddResourceToProjectMutation from '../mutations/AddResourceToProjectMutation';
import RemovePendingResourceToProjectMutation from '../../shared/mutations/RemovePendingResourceToProjectMutation';

class AddResource extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    project: React.PropTypes.object,
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
    const {resource, project} = this.props;
    Relay.Store.commitUpdate(
      new AddResourceToProjectMutation({
        resource,
        project,
      })
    );
    Relay.Store.commitUpdate(
      new RemovePendingResourceToProjectMutation({
        resource,
        project,
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
    project: () => Relay.QL`
      fragment on Project {
        id,
        ${AddResourceToProjectMutation.getFragment('project')},
        ${RemovePendingResourceToProjectMutation.getFragment('project')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        ${AddResourceToProjectMutation.getFragment('resource')},
        ${RemovePendingResourceToProjectMutation.getFragment('resource')},
      }
    `,
  },
});
