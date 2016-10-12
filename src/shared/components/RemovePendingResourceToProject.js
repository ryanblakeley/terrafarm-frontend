import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/FlatButton';

import RemovePendingResourceToProjectMutation from '../mutations/RemovePendingResourceToProjectMutation';

class RemovePendingResourceToProject extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    project: React.PropTypes.object,
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
    const {resource, project} = this.props;
    Relay.Store.commitUpdate(
      new RemovePendingResourceToProjectMutation({
        resource,
        project,
      })
    );
  }
  render () {
    return (
      <FlatButton
        resource={this.props.resource}
        project={this.props.project}
        label={this.props.label}
        primary={this.props.primary}
        secondary={this.props.secondary}
        onTouchTap={this.handleConfirm}
      />
    );
  }
}

export default Relay.createContainer(RemovePendingResourceToProject, {
  initialVariables: {
    projectId: null,
  },
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id,
        name,
        ${RemovePendingResourceToProjectMutation.getFragment('project')},
      },
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RemovePendingResourceToProjectMutation.getFragment('resource')},
      }
    `,
  },
});
