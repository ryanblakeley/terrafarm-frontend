import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/FlatButton';

import RemoveResourceFromOrganizationMutation from '../mutations/RemoveResourceFromOrganizationMutation';

class RemoveResourceFromOrganization extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    organization: React.PropTypes.object,
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
    const {resource, organization} = this.props;
    Relay.Store.commitUpdate(
      new RemoveResourceFromOrganizationMutation({
        resource,
        organization,
      })
    );
  }
  render () {
    return (
      <FlatButton
        resource={this.props.resource}
        organization={this.props.organization}
        label={this.props.label}
        primary={this.props.primary}
        secondary={this.props.secondary}
        onTouchTap={this.handleRemove}
      />
    );
  }
}

export default Relay.createContainer(RemoveResourceFromOrganization, {
  initialVariables: {
    organizationId: null,
  },
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        id,
        name,
        ${RemoveResourceFromOrganizationMutation.getFragment('organization')},
      },
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RemoveResourceFromOrganizationMutation.getFragment('resource')},
      }
    `,
  },
});
