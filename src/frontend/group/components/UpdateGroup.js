import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import UpdateGroupMutation from '../mutations/UpdateGroupMutation';

class UpdateGroup extends React.Component {
  static propTypes = {
    group: React.PropTypes.object,
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
    const {group, attributes} = this.props;

    Relay.Store.commitUpdate(
      new UpdateGroupMutation({
        group,
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
        label={'Save'}
        primary={this.props.primary}
        secondary={this.props.secondary}
        onTouchTap={this.handleSave}
        disabled={this.props.disabled}
      />
    );
  }
}

export default Relay.createContainer(UpdateGroup, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        ${UpdateGroupMutation.getFragment('group')},
      }
    `,
  },
});


