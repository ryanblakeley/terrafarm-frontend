import Relay from 'react-relay';

export default class UpdateTaskMutation extends Relay.Mutation {
  static fragments = {
    task: () => Relay.QL`
      fragment on Task {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateTask}`;
  }
  getVariables () {
    return {
      id: this.props.task.id,
      taskPatch: this.props.taskPatch,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateTaskPayload {
        task,
        userByAuthorId,
        projectByProjectId,
        query,
      }
    `;
  }
  getOptimisticResponse () {
    const {taskPatch} = this.props;
    const {name, description} = taskPatch;

    return {
      task: {
        name,
        description,
      },
    };
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          task: this.props.task.id,
        },
      },
    ];
  }
}
