import Relay from 'react-relay';

export default class DeleteResourceMutation extends Relay.Mutation {
  static fragments = {
    master: () => Relay.QL`
      fragment on Master {
        id,
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{deleteResource}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteResourcePayload {
        removedResourceID,
        master {
          resources,
        },
        user {
          resources,
        },
      }
    `;
  }
/*
  getOptimisticResponse () {
    return {resource: {}};
  }
*/
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'master',
        parentID: this.props.master.id,
        connectionName: 'resources',
        deletedIDFieldName: 'removedResourceID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'resources',
        deletedIDFieldName: 'removedResourceID',
      },
    ];
  }
  getVariables () {
    return {
      resourceId: this.props.resource.id,
      userId: this.props.user.id,
    };
  }
}
