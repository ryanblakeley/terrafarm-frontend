import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import TextInput from '../../shared/components/TextInput';
import CreateTaskMutation from '../mutations/CreateTaskMutation';

class CreateTaskForm extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
    query: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  static contextTypes = {
    router: React.PropTypes.object,
  };
  handleSubmit = data => {
    const {project, query} = this.props;
    const {router} = this.context;

    Relay.Store.commitUpdate(
      new CreateTaskMutation({
        taskData: data,
        project,
        query,
      }), {
        onSuccess: response => {
          const taskId = response.createTask.taskEdge.node.rowId;
          router.push(`/task/${taskId}`);
        },
      }
    );
  }
  render () {
    return <ActionPanelForm
      title={'New Task'}
      notifyClose={this.props.notifyClose}
      onValidSubmit={this.handleSubmit}
    >
      <TextInput
        name={'name'}
        label={'Name'}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
        required
      />
      <TextInput
        name={'description'}
        label={'Description'}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
        required
        multiLine
        rows={3}
      />
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(CreateTaskForm, {
  initialVariables: {
    projectId: null,
  },
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        ${CreateTaskMutation.getFragment('project')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${CreateTaskMutation.getFragment('query')},
      }
    `,
  },
});
