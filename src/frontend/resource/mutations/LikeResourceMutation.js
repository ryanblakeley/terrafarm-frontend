import Relay from 'react-relay';

export default class LikeResourceMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        likedBy(first: 18) {
          edges {
            node { id },
          },
        },
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{likeResource}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on LikeResourcePayload {
        resourceEdge,
        userEdge,
        user,
        resource,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'resourcesLiked',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'resource',
        parentID: this.props.resource.id,
        connectionName: 'likedBy',
        edgeName: 'userEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on LikeResourcePayload {
            resourceEdge,
          }
        `],
      },
    ];
  }
  getOptimisticResponse () {
    const {user, resource} = this.props;

    return {
      userEdge: {
        node: {
          id: user.id,
        },
      },
      resourceEdge: {
        node: {
          id: resource.id,
        },
      },
      resource: {
        likedBy: {
          edges: resource.likedBy.edges.push({
            node: {
              id: user.id,
            },
          }),
        },
      },
    };
  }
  getVariables () {
    return {
      userId: this.props.user.id,
      resourceId: this.props.resource.id,
    };
  }
}
