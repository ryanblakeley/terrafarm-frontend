import Relay from 'react-relay';

export default class CreateResourceStarMutation extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        rowId,
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        rowId,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{createResourceStar}`;
  }
  getVariables () {
    return {
      resourceStar: {
        resourceId: this.props.resource.rowId,
        userId: this.props.user.rowId,
      },
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreateResourceStarPayload {
        resourceStar,
        resourceStarEdge,
        resourceByResourceId {
          resourceStarsByResourceId,
        },
        userByUserId {
          resourceStarsByUserId,
        },
        query,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'userByUserId',
        parentID: this.props.user.id,
        connectionName: 'resourceStarsByUserId',
        edgeName: 'resourceStarEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'resourceByResourceId',
        parentID: this.props.resource.id,
        connectionName: 'resourceStarsByResourceId',
        edgeName: 'resourceStarEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
    ];
  }
}

