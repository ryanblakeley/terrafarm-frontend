import Relay from 'react-relay';

export default class CreateTaskResourceMutation extends Relay.Mutation {
  static fragments = {
    task: () => Relay.QL`
      fragment on Task {
        id,
        rowId,
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        rowId,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{createTaskResource}`;
  }
  getVariables () {
    return {
      taskResource: {
        taskId: this.props.task.rowId,
        resourceId: this.props.resource.rowId,
        status: this.props.status,
      },
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreateTaskResourcePayload {
        taskResource,
        taskResourceEdge,
        taskByTaskId {
          taskResourcesByTaskId,
        },
        resourceByResourceId {
          taskResourcesByResourceId,
        },
        query,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'taskByTaskId',
        parentID: this.props.task.id,
        connectionName: 'taskResourcesByTaskId',
        edgeName: 'taskResourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'resourceByResourceId',
        parentID: this.props.resource.id,
        connectionName: 'taskResourcesByResourceId',
        edgeName: 'taskResourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
    ];
  }
}

