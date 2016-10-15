import Relay from 'react-relay';

export default class CreateResourceMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
        rowId,
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation { createResource }`;
  }
  getVariables () {
    return {
      resource: Object.assign({
        ownerId: this.props.user.rowId,
      }, this.props.resourceData),
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreateResourcePayload {
        resourceEdge,
        query {
          allResources,
        },
        userByOwnerId {
          resourcesByOwnerId,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'userByOwnerId',
        parentID: this.props.user.id,
        connectionName: 'resourcesByOwnerId',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'query',
        parentID: this.props.query.id,
        connectionName: 'allResources',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
    ];
  }
}
