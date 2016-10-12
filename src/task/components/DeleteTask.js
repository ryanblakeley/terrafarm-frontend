import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/FlatButton';

import DeleteTaskMutation from '../mutations/DeleteTaskMutation';

class DeleteTask extends React.Component {
  static propTypes = {
    task: React.PropTypes.object,
    master: React.PropTypes.object,
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
      new DeleteTaskMutation({
        master,
        task,
      })
    );

    this.handleComplete();
  }
  handleComplete = () => {
    const {task} = this.props;
    const {router} = this.context;
    const parentProject = task.projects.edges[0].node;

    if (this.props.onComplete) {
      this.props.onComplete();
    }
    router.push(`/project/${parentProject.id}`);
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
        projects(first: 1) {
          edges {
            node { id }
          }
        },
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
