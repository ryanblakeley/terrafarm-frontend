import Relay from 'react-relay';

export default class CreateUserStarMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
        rowId,
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        id,
        rowId,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{createUserStar}`;
  }
  getVariables () {
    return {
      userStar: {
        followingId: this.props.user.rowId,
        followerId: this.props.currentPerson.rowId,
      },
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreateUserStarPayload {
        userStar,
        userStarEdge,
        userByFollowingId,
        userByFollowerId {
          userStarsByFollowerId,
        },
        query,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'userByFollowerId',
        parentID: this.props.currentPerson.id,
        connectionName: 'userStarsByFollowerId',
        edgeName: 'userStarEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'userByFollowingId',
        parentID: this.props.user.id,
        connectionName: 'userStarsByFollowingId',
        edgeName: 'userStarEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
    ];
  }
}

