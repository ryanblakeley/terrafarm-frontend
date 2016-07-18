import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import UpdateResourceMutation from '../mutations/UpdateResourceMutation';

class SaveEditResource extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    attributes: React.PropTypes.object,
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    onComplete: React.PropTypes.func,
    disabled: React.PropTypes.bool,
  };
  static defaultProps = {
    label: 'Save',
    primary: false,
    secondary: false,
  };
  handleSave = () => {
    const {resource, attributes} = this.props;

    Relay.Store.commitUpdate(
      new UpdateResourceMutation({
        resource,
        attributes,
      })
    );

    this.handleComplete();
  }
  handleComplete = () => {
    if (this.props.onComplete) {
      this.props.onComplete();
    }
  }
  render () {
    return (
      <FlatButton
        {...this.props}
        onTouchTap={this.handleSave}
      />
    );
  }
}

export default Relay.createContainer(SaveEditResource, {
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        ${UpdateResourceMutation.getFragment('resource')},
      }
    `,
  },
});
