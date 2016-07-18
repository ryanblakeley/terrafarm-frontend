import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import DeleteLandMutation from '../mutations/DeleteLandMutation';

class DeleteLand extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
    land: React.PropTypes.object,
    user: React.PropTypes.object,
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    default: React.PropTypes.bool,
    onComplete: React.PropTypes.func,
    disabled: React.PropTypes.bool,
  };
  static contextTypes = {
    router: React.PropTypes.object,
  };
  static defaultProps = {
    label: 'Delete',
    primary: false,
    secondary: false,
    default: true,
  };
  handleDelete = () => {
    const {land, master, user} = this.props;

    Relay.Store.commitUpdate(
      new DeleteLandMutation({
        master,
        land,
        user,
      })
    );

    this.handleComplete();
  }
  handleComplete = () => {
    const {router} = this.context;

    if (this.props.onComplete) {
      this.props.onComplete();
    }
    router.push('/profile');
  }
  render () {
    return (
      <FlatButton
        {...this.props}
        label={'Delete'}
        onTouchTap={this.handleDelete}
      />
    );
  }
}

export default Relay.createContainer(DeleteLand, {
  fragments: {
    land: () => Relay.QL`
      fragment on Land {
        id,
        ${DeleteLandMutation.getFragment('land')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${DeleteLandMutation.getFragment('master')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        ${DeleteLandMutation.getFragment('user')},
      }
    `,
  },
});
