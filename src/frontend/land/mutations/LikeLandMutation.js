import Relay from 'react-relay';

export default class LikeLandMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    land: () => Relay.QL`
      fragment on Land {
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
    return Relay.QL`mutation{likeLand}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on LikeLandPayload {
        landEdge,
        userEdge,
        user,
        land,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'landsLiked',
        edgeName: 'landEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'land',
        parentID: this.props.land.id,
        connectionName: 'likedBy',
        edgeName: 'userEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on LikeLandPayload {
            landEdge,
          }
        `],
      },
    ];
  }
  getOptimisticResponse () {
    const {user, land} = this.props;

    return {
      userEdge: {
        node: {
          id: user.id,
        },
      },
      landEdge: {
        node: {
          id: land.id,
        },
      },
      land: {
        likedBy: {
          edges: land.likedBy.edges.push({
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
      landId: this.props.land.id,
    };
  }
}


