import Relay from 'react-relay';

export default class DeleteUserStarMutation extends Relay.Mutation {
  static fragments = {
    userStar: () => Relay.QL`
      fragment on UserStar {
        id,
        userByFollowingId {
          id,
        },
        userByFollowerId {
          id,
        },
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{deleteUserStar}`;
  }
  getVariables () {
    return {
      id: this.props.userStar.id,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteUserStarPayload {
        deletedUserStarId,
        userByFollowingId {
          userStarsByFollowingId,
        },
        userByFollowerId {
          userStarsByFollowerId,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'userByFollowingId',
        parentID: this.props.userStar.userByFollowingId.id,
        connectionName: 'userStarsByFollowingId',
        deletedIDFieldName: 'deletedUserStarId',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'userByFollowerId',
        parentID: this.props.userStar.userByFollowerId.id,
        connectionName: 'userStarsByFollowerId',
        deletedIDFieldName: 'deletedUserStarId',
      },
    ];
  }
}
