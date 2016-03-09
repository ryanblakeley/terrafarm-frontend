import Relay from 'react-relay';

export default class LikeGroupMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    group: () => Relay.QL`
      fragment on Group {
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
    return Relay.QL`mutation{likeGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on LikeGroupPayload {
        groupEdge,
        userEdge,
        user,
        group,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'groupsLiked',
        edgeName: 'groupEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'group',
        parentID: this.props.group.id,
        connectionName: 'likedBy',
        edgeName: 'userEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on LikeGroupPayload {
            groupEdge,
          }
        `],
      },
    ];
  }
  getOptimisticResponse () {
    const {user, group} = this.props;

    return {
      userEdge: {
        node: {
          id: user.id,
        },
      },
      groupEdge: {
        node: {
          id: group.id,
        },
      },
      group: {
        likedBy: {
          edges: group.likedBy.edges.push({
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
      groupId: this.props.group.id,
    };
  }
}


