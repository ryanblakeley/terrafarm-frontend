import Relay from 'react-relay';

export default class LikeOrganizationMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    organization: () => Relay.QL`
      fragment on Organization {
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
    return Relay.QL`mutation{likeOrganization}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on LikeOrganizationPayload {
        organizationEdge,
        userEdge,
        user,
        organization,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'organizationsLiked',
        edgeName: 'organizationEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'organization',
        parentID: this.props.organization.id,
        connectionName: 'likedBy',
        edgeName: 'userEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on LikeOrganizationPayload {
            organizationEdge,
          }
        `],
      },
    ];
  }
  getOptimisticResponse () {
    const {user, organization} = this.props;

    return {
      userEdge: {
        node: {
          id: user.id,
        },
      },
      organizationEdge: {
        node: {
          id: organization.id,
        },
      },
      organization: {
        likedBy: {
          edges: organization.likedBy.edges.push({
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
      organizationId: this.props.organization.id,
    };
  }
}
