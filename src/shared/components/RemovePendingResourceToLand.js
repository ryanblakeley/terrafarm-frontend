import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/FlatButton';

import RemovePendingResourceToLandMutation from '../mutations/RemovePendingResourceToLandMutation';

class RemovePendingResourceToLand extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    land: React.PropTypes.object,
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
    const {resource, land} = this.props;
    Relay.Store.commitUpdate(
      new RemovePendingResourceToLandMutation({
        resource,
        land,
      })
    );
  }
  render () {
    return (
      <FlatButton
        resource={this.props.resource}
        land={this.props.land}
        label={this.props.label}
        primary={this.props.primary}
        secondary={this.props.secondary}
        onTouchTap={this.handleConfirm}
      />
    );
  }
}

export default Relay.createContainer(RemovePendingResourceToLand, {
  initialVariables: {
    landId: null,
  },
  fragments: {
    land: () => Relay.QL`
      fragment on Land {
        id,
        name,
        ${RemovePendingResourceToLandMutation.getFragment('land')},
      },
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RemovePendingResourceToLandMutation.getFragment('resource')},
      }
    `,
  },
});
