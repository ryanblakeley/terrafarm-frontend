import Relay from 'react-relay';

export default class DeleteResourceStarMutation extends Relay.Mutation {
  static fragments = {
    resourceStar: () => Relay.QL`
      fragment on ResourceStar {
        id,
        resourceByResourceId {
          id,
        },
        userByUserId {
          id,
        },
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{deleteResourceStar}`;
  }
  getVariables () {
    return {
      id: this.props.resourceStar.id,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteResourceStarPayload {
        deletedResourceStarId,
        resourceByResourceId {
          resourceStarsByResourceId,
        },
        userByUserId {
          resourceStarsByUserId,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'resourceByResourceId',
        parentID: this.props.resourceStar.resourceByResourceId.id,
        connectionName: 'resourceStarsByResourceId',
        deletedIDFieldName: 'deletedResourceStarId',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'userByUserId',
        parentID: this.props.resourceStar.userByUserId.id,
        connectionName: 'resourceStarsByUserId',
        deletedIDFieldName: 'deletedResourceStarId',
      },
    ];
  }
}
