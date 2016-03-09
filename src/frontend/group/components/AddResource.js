import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import AddResourceToGroupMutation from '../mutations/AddResourceToGroupMutation';
import RemovePendingResourceToGroupMutation from '../../shared/mutations/RemovePendingResourceToGroupMutation';

class AddResource extends React.Component {
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
    const {resource, group} = this.props;
    Relay.Store.commitUpdate(
      new AddResourceToGroupMutation({
        resource,
        group,
      })
    );
    Relay.Store.commitUpdate(
      new RemovePendingResourceToGroupMutation({
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
      onTouchTap={this.handleApprove}
    />;
  }
}


export default Relay.createContainer(AddResource, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        ${AddResourceToGroupMutation.getFragment('group')},
        ${RemovePendingResourceToGroupMutation.getFragment('group')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        ${AddResourceToGroupMutation.getFragment('resource')},
        ${RemovePendingResourceToGroupMutation.getFragment('resource')},
      }
    `,
  },
});
