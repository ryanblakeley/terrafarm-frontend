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
  state = {
    error: false,
  };
  handleSubmit = data => {
    const {project, query} = this.props;

    Relay.Store.commitUpdate(
      new CreateTaskMutation({
        taskData: data,
        project,
        query,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  handleSuccess = response => {
    const {router} = this.context;
    const taskId = response.createTask.taskEdge.node.rowId;
    router.push(`/task/${taskId}`);
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  render () {
    const { error } = this.state;
    return <ActionPanelForm
      title={'New Task'}
      notifyClose={this.props.notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
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
