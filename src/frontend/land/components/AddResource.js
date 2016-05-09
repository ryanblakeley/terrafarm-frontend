import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import AddResourceToLandMutation from '../mutations/AddResourceToLandMutation';
import RemovePendingResourceToLandMutation from '../../shared/mutations/RemovePendingResourceToLandMutation';

class AddResource extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    land: React.PropTypes.object,
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
    const {resource, land} = this.props;
    Relay.Store.commitUpdate(
      new AddResourceToLandMutation({
        resource,
        land,
      })
    );
    Relay.Store.commitUpdate(
      new RemovePendingResourceToLandMutation({
        resource,
        land,
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
    land: () => Relay.QL`
      fragment on Land {
        id,
        ${AddResourceToLandMutation.getFragment('land')},
        ${RemovePendingResourceToLandMutation.getFragment('land')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        ${AddResourceToLandMutation.getFragment('resource')},
        ${RemovePendingResourceToLandMutation.getFragment('resource')},
      }
    `,
  },
});
