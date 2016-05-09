import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import DeleteTaskMutation from '../mutations/DeleteTaskMutation';

class DeleteTask extends React.Component {
  static propTypes = {
    task: React.PropTypes.object,
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
    const {task, master} = this.props;

    Relay.Store.commitUpdate(
      new DeleteLandMutation({
        master,
        task,
      })
    );

    this.handleComplete();
  }
  handleComplete = () => {
    const {router} = this.context;

    if (this.props.onComplete) {
      this.props.onComplete();
    }
    router.push('/auth/profile');
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

export default Relay.createContainer(DeleteTask, {
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        id,
        ${DeleteTaskMutation.getFragment('task')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${DeleteTaskMutation.getFragment('master')},
      }
    `,
  },
});
