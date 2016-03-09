import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import PendingResourceToGroupMutation from '../mutations/PendingResourceToGroupMutation';

class AddPendingResource extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    group: React.PropTypes.object,
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
    const {resource, group} = this.props;
    Relay.Store.commitUpdate(
      new PendingResourceToGroupMutation({
        resource,
        group,
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
    group: () => Relay.QL`
      fragment on Group {
        id,
        ${PendingResourceToGroupMutation.getFragment('group')},
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
        ${PendingResourceToGroupMutation.getFragment('resource')},
      }
    `,
  },
});
