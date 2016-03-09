import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import RemovePendingResourceToGroupMutation from '../mutations/RemovePendingResourceToGroupMutation';

class RemovePendingResourceToGroup extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    group: React.PropTypes.object,
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
    const {resource, group} = this.props;
    Relay.Store.commitUpdate(
      new RemovePendingResourceToGroupMutation({
        resource,
        group,
      })
    );
  }
  render () {
    return (
      <FlatButton
        resource={this.props.resource}
        group={this.props.group}
        label={this.props.label}
        primary={this.props.primary}
        secondary={this.props.secondary}
        onTouchTap={this.handleConfirm}
      />
    );
  }
}

export default Relay.createContainer(RemovePendingResourceToGroup, {
  initialVariables: {
    groupId: null,
  },
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
        ${RemovePendingResourceToGroupMutation.getFragment('group')},
      },
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RemovePendingResourceToGroupMutation.getFragment('resource')},
      }
    `,
  },
});
