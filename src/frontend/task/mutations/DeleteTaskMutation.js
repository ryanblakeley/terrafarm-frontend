import Relay from 'react-relay';

export default class DeleteTaskMutation extends Relay.Mutation {
  static fragments = {
    master: () => Relay.QL`
      fragment on Master {
        id,
      }
    `,
    task: () => Relay.QL`
      fragment on Task {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{deleteTask}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteTaskPayload {
        removedTaskID,
        master {
          tasks,
        },
      }
    `;
  }
/*
  getOptimisticResponse () {
    return {task: {}};
  }
*/
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'master',
        parentID: this.props.master.id,
        connectionName: 'tasks',
        deletedIDFieldName: 'removedTaskID',
      },
    ];
  }
  getVariables () {
    return {
      taskId: this.props.task.id,
    };
  }
}
