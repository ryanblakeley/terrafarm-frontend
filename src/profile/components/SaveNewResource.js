import React from 'react';
import Relay from 'react-relay';
import RaisedButton from 'material-ui/lib/raised-button';

import NewResourceMutation from '../mutations/NewResourceMutation';

class NewResource extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    master: React.PropTypes.object,
    onComplete: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    attributes: React.PropTypes.shape({
      name: React.PropTypes.string,
      description: React.PropTypes.string,
      category: React.PropTypes.string,
    }),
  };
  static defaultProps = {
    label: 'Save',
    disabled: true,
    primary: false,
    secondary: false,
  };
  onComplete = () => {
    if (this.props.onComplete) {
      this.props.onComplete();
    }
  }
  handleSubmit = () => {
    if (this.props.disabled) {
      console.warn('New resource is not ready');
      return;
    }

    const {user, master, attributes} = this.props;
    const {name, description, category} = attributes;

    Relay.Store.commitUpdate(
      new NewResourceMutation({
        user,
        master,
        name,
        description,
        category,
      })
    );

    this.onComplete();
  }
  render () {
    return (
      <RaisedButton
        {...this.props}
        onTouchTap={this.handleSubmit}
      />
    );
  }
}

export default Relay.createContainer(NewResource, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${NewResourceMutation.getFragment('master')},
      },
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        ${NewResourceMutation.getFragment('user')},
      }
    `,
  },
});
