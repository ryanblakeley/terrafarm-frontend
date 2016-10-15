import Relay from 'react-relay';

export default class DeleteResourceMutation extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        userByOwnerId {
          id,
        },
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{deleteResource}`;
  }
  getVariables () {
    return {
      id: this.props.resource.id,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteResourcePayload {
        deletedResourceId,
        userByOwnerId {
          resourcesByOwnerId,
        },
        query {
          allResources
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'query',
        parentID: this.props.query.id,
        connectionName: 'allResources',
        deletedIDFieldName: 'deletedResourceId',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'userByOwnerId',
        parentID: this.props.resource.userByOwnerId.id,
        connectionName: 'resourcesByOwnerId',
        deletedIDFieldName: 'deletedResourceId',
      },
    ];
  }
}
