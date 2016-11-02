import Relay from 'react-relay';

export default class DeleteTaskResourceMutation extends Relay.Mutation {
  static fragments = {
    taskResource: () => Relay.QL`
      fragment on TaskResource {
        id,
        taskByTaskId {
          id,
        },
        resourceByResourceId {
          id,
        },
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{deleteTaskResource}`;
  }
  getVariables () {
    return {
      id: this.props.taskResource.id,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteTaskResourcePayload {
        deletedTaskResourceId,
        taskByTaskId {
          taskResourcesByTaskId,
        },
        resourceByResourceId {
          taskResourcesByResourceId,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'taskByTaskId',
        parentID: this.props.taskResource.taskByTaskId.id,
        connectionName: 'taskResourcesByTaskId',
        deletedIDFieldName: 'deletedTaskResourceId',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'resourceByResourceId',
        parentID: this.props.taskResource.resourceByResourceId.id,
        connectionName: 'taskResourcesByResourceId',
        deletedIDFieldName: 'deletedTaskResourceId',
      },
    ];
  }
}
