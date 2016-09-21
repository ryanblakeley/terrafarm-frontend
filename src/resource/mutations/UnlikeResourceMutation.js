import Relay from 'react-relay';

export default class UnlikeResourceMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{unlikeResource}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UnlikeResourcePayload {
        removedResourceID,
        removedUserID,
        user,
        resource,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'resourcesLiked',
        deletedIDFieldName: 'removedResourceID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'resource',
        parentID: this.props.resource.id,
        connectionName: 'likedBy',
        deletedIDFieldName: 'removedUserID',
      },
    ];
  }
  getVariables () {
    return {
      userId: this.props.user.id,
      resourceId: this.props.resource.id,
    };
  }
}

