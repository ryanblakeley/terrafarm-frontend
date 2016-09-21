import Relay from 'react-relay';

export default class RemoveResourceFromTaskMutation extends Relay.Mutation {
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
    return Relay.QL`mutation{removeResourceFromTask}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on RemoveResourceFromTaskPayload {
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
        connectionName: 'tasks',
        deletedIDFieldName: 'removedTaskID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'task',
        parentID: this.props.task.id,
        connectionName: 'resources',
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


