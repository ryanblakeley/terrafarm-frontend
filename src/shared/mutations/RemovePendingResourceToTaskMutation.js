import Relay from 'react-relay';

export default class RemovePendingResourceToTaskMutation extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
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
    return Relay.QL`mutation{removePendingResourceToTask}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on RemovePendingResourceToTaskPayload {
        removedTaskID,
        removedResourceID,
        resource,
        task,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'resource',
        parentID: this.props.resource.id,
        connectionName: 'tasksPending',
        deletedIDFieldName: 'removedTaskID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'task',
        parentID: this.props.task.id,
        connectionName: 'resourcesPending',
        deletedIDFieldName: 'removedResourceID',
      },
    ];
  }
  getVariables () {
    return {
      resourceId: this.props.resource.id,
      taskId: this.props.task.id,
    };
  }
}

