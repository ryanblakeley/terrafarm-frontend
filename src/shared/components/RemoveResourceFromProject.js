import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import RemoveResourceFromProjectMutation from '../mutations/RemoveResourceFromProjectMutation';

class RemoveResourceFromProject extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    project: React.PropTypes.object,
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
    const {resource, project} = this.props;
    Relay.Store.commitUpdate(
      new RemoveResourceFromProjectMutation({
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
        onTouchTap={this.handleRemove}
      />
    );
  }
}

export default Relay.createContainer(RemoveResourceFromProject, {
  initialVariables: {
    projectId: null,
  },
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id,
        name,
        ${RemoveResourceFromProjectMutation.getFragment('project')},
      },
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RemoveResourceFromProjectMutation.getFragment('resource')},
      }
    `,
  },
});
