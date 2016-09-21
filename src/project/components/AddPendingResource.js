import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import PendingResourceToProjectMutation from '../mutations/PendingResourceToProjectMutation';

class AddPendingResource extends React.Component {
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
    const {resource, project} = this.props;
    Relay.Store.commitUpdate(
      new PendingResourceToProjectMutation({
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
      onTouchTap={this.handleConfirm}
    />;
  }
}

export default Relay.createContainer(AddPendingResource, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id,
        ${PendingResourceToProjectMutation.getFragment('project')},
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
        ${PendingResourceToProjectMutation.getFragment('resource')},
      }
    `,
  },
});
