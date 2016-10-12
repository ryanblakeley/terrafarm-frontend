import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/FlatButton';

import RemoveResourceFromLandMutation from '../mutations/RemoveResourceFromLandMutation';

class RemoveResourceFromLand extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    land: React.PropTypes.object,
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
    const {resource, land} = this.props;
    Relay.Store.commitUpdate(
      new RemoveResourceFromLandMutation({
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
        onTouchTap={this.handleRemove}
      />
    );
  }
}

export default Relay.createContainer(RemoveResourceFromLand, {
  initialVariables: {
    landId: null,
  },
  fragments: {
    land: () => Relay.QL`
      fragment on Land {
        id,
        name,
        ${RemoveResourceFromLandMutation.getFragment('land')},
      },
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RemoveResourceFromLandMutation.getFragment('resource')},
      }
    `,
  },
});
