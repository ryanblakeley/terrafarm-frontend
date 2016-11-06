import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import TextInput from '../../shared/components/TextInput';
import UpdateTaskMutation from '../mutations/UpdateTaskMutation';
import DeleteTaskMutation from '../mutations/DeleteTaskMutation';

class EditTaskForm extends React.Component {
  static propTypes = {
    task: React.PropTypes.object,
    query: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  static contextTypes = {
    router: React.PropTypes.object,
  };
  handleSubmit = data => {
    const {task} = this.props;

    Relay.Store.commitUpdate(
      new UpdateTaskMutation({
        taskPatch: data,
        task,
      })
    );
  }
  handleDelete = () => {
    const {task, query} = this.props;
    const {router} = this.context;
    const projectId = task.projectByProjectId.rowId;

    Relay.Store.commitUpdate(
      new DeleteTaskMutation({
        task,
        query,
      })
    );

    router.push(`/project/${projectId}`);
  }
  render () {
    const {task, notifyClose} = this.props;

    return <ActionPanelForm
      title={'Edit'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={this.handleDelete}
    >
      <TextInput
        name={'name'}
        label={'Name'}
        initialValue={task.name}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
        required
      />
      <TextInput
        name={'description'}
        label={'Description'}
        initialValue={task.description}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
        required
        multiLine
        rows={3}
      />
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(EditTaskForm, {
  initialVariables: {
    taskId: null,
  },
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        id,
        name,
        description,
        projectByProjectId {
          rowId,
        },
        ${UpdateTaskMutation.getFragment('task')},
        ${DeleteTaskMutation.getFragment('task')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${DeleteTaskMutation.getFragment('query')},
      }
    `,
  },
});

